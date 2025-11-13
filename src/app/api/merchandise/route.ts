import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { merchandise } from '@/db/schema';
import { eq, like, or, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const record = await db
        .select()
        .from(merchandise)
        .where(eq(merchandise.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Merchandise not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const available = searchParams.get('available');

    let query = db.select().from(merchandise);
    const conditions = [];

    // Search by name or description
    if (search) {
      conditions.push(
        or(
          like(merchandise.name, `%${search}%`),
          like(merchandise.description, `%${search}%`)
        )
      );
    }

    // Filter by category
    if (category) {
      conditions.push(eq(merchandise.category, category));
    }

    // Filter by available status
    if (available !== null && available !== undefined) {
      conditions.push(eq(merchandise.available, parseInt(available)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

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
    const { name, description, price, image, category, available } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required', code: 'MISSING_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (!price) {
      return NextResponse.json(
        { error: 'Price is required', code: 'MISSING_PRICE' },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required', code: 'MISSING_IMAGE' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required', code: 'MISSING_CATEGORY' },
        { status: 400 }
      );
    }

    // Validate category is one of the allowed values
    const validCategories = ['clothing', 'accessories', 'collectibles'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        {
          error: 'Category must be one of: clothing, accessories, collectibles',
          code: 'INVALID_CATEGORY',
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedDescription = description.trim();
    const sanitizedPrice = price.trim();
    const sanitizedImage = image.trim();
    const sanitizedCategory = category.trim();

    // Prepare insert data
    const insertData = {
      name: sanitizedName,
      description: sanitizedDescription,
      price: sanitizedPrice,
      image: sanitizedImage,
      category: sanitizedCategory,
      available: available !== undefined ? parseInt(available) : 1,
      createdAt: new Date().toISOString(),
    };

    const newRecord = await db
      .insert(merchandise)
      .values(insertData)
      .returning();

    return NextResponse.json(newRecord[0], { status: 201 });
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

    // Check if record exists
    const existing = await db
      .select()
      .from(merchandise)
      .where(eq(merchandise.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Merchandise not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, description, price, image, category, available } = body;

    // Validate category if provided
    if (category) {
      const validCategories = ['clothing', 'accessories', 'collectibles'];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          {
            error: 'Category must be one of: clothing, accessories, collectibles',
            code: 'INVALID_CATEGORY',
          },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updates: any = {};

    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description.trim();
    if (price !== undefined) updates.price = price.trim();
    if (image !== undefined) updates.image = image.trim();
    if (category !== undefined) updates.category = category.trim();
    if (available !== undefined) updates.available = parseInt(available);

    const updated = await db
      .update(merchandise)
      .set(updates)
      .where(eq(merchandise.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
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
    const existing = await db
      .select()
      .from(merchandise)
      .where(eq(merchandise.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Merchandise not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(merchandise)
      .where(eq(merchandise.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Merchandise deleted successfully',
        deleted: deleted[0],
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