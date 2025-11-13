import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { newsArticles } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const article = await db
        .select()
        .from(newsArticles)
        .where(eq(newsArticles.id, parseInt(id)))
        .limit(1);

      if (article.length === 0) {
        return NextResponse.json(
          { error: 'News article not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(article[0], { status: 200 });
    }

    // List with pagination, filtering, and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let query = db.select().from(newsArticles);

    // Build conditions array
    const conditions = [];

    // Add category filter
    if (category) {
      conditions.push(eq(newsArticles.category, category));
    }

    // Add search filter
    if (search) {
      conditions.push(
        or(
          like(newsArticles.title, `%${search}%`),
          like(newsArticles.excerpt, `%${search}%`),
          like(newsArticles.author, `%${search}%`)
        )
      );
    }

    // Apply conditions if any exist
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(newsArticles.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, date, author, image, excerpt, content } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required', code: 'MISSING_CATEGORY' },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required', code: 'MISSING_DATE' },
        { status: 400 }
      );
    }

    if (!author) {
      return NextResponse.json(
        { error: 'Author is required', code: 'MISSING_AUTHOR' },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required', code: 'MISSING_IMAGE' },
        { status: 400 }
      );
    }

    if (!excerpt) {
      return NextResponse.json(
        { error: 'Excerpt is required', code: 'MISSING_EXCERPT' },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required', code: 'MISSING_CONTENT' },
        { status: 400 }
      );
    }

    // Validate category is one of the allowed values
    const validCategories = ['Announcements', 'Music', 'Highlights'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        {
          error: 'Category must be one of: Announcements, Music, Highlights',
          code: 'INVALID_CATEGORY',
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      title: title.trim(),
      category: category.trim(),
      date: date.trim(),
      author: author.trim(),
      image: image.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    const newArticle = await db
      .insert(newsArticles)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newArticle[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Check if record exists
    const existingArticle = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.id, parseInt(id)))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        { error: 'News article not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate category if provided
    if (body.category) {
      const validCategories = ['Announcements', 'Music', 'Highlights'];
      if (!validCategories.includes(body.category)) {
        return NextResponse.json(
          {
            error: 'Category must be one of: Announcements, Music, Highlights',
            code: 'INVALID_CATEGORY',
          },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updates: Record<string, string> = {};

    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.category !== undefined) updates.category = body.category.trim();
    if (body.date !== undefined) updates.date = body.date.trim();
    if (body.author !== undefined) updates.author = body.author.trim();
    if (body.image !== undefined) updates.image = body.image.trim();
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt.trim();
    if (body.content !== undefined) updates.content = body.content.trim();

    const updatedArticle = await db
      .update(newsArticles)
      .set(updates)
      .where(eq(newsArticles.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedArticle[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existingArticle = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.id, parseInt(id)))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        { error: 'News article not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(newsArticles)
      .where(eq(newsArticles.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'News article deleted successfully',
        article: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}