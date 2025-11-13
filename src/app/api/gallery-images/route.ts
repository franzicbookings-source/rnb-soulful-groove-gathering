import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { galleryImages } from '@/db/schema';
import { eq, like, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: 'Valid ID is required',
            code: 'INVALID_ID' 
          },
          { status: 400 }
        );
      }

      const galleryImage = await db.select()
        .from(galleryImages)
        .where(eq(galleryImages.id, parseInt(id)))
        .limit(1);

      if (galleryImage.length === 0) {
        return NextResponse.json(
          { error: 'Gallery image not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(galleryImage[0], { status: 200 });
    }

    // List with pagination, filtering, and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const year = searchParams.get('year');

    let query = db.select().from(galleryImages);
    const conditions = [];

    // Filter by year
    if (year) {
      conditions.push(eq(galleryImages.year, year));
    }

    // Search by alt text
    if (search) {
      conditions.push(like(galleryImages.alt, `%${search}%`));
    }

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(galleryImages.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, alt, year } = body;

    // Validate required fields
    if (!url) {
      return NextResponse.json(
        { 
          error: 'URL is required',
          code: 'MISSING_URL' 
        },
        { status: 400 }
      );
    }

    if (!alt) {
      return NextResponse.json(
        { 
          error: 'Alt text is required',
          code: 'MISSING_ALT' 
        },
        { status: 400 }
      );
    }

    if (!year) {
      return NextResponse.json(
        { 
          error: 'Year is required',
          code: 'MISSING_YEAR' 
        },
        { status: 400 }
      );
    }

    // Validate year format
    if (year !== '2024' && year !== '2025') {
      return NextResponse.json(
        { 
          error: 'Year must be either "2024" or "2025"',
          code: 'INVALID_YEAR' 
        },
        { status: 400 }
      );
    }

    // Create gallery image with auto-generated fields
    const newGalleryImage = await db.insert(galleryImages)
      .values({
        url: url.trim(),
        alt: alt.trim(),
        year: year.trim(),
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newGalleryImage[0], { status: 201 });

  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Check if record exists
    const existing = await db.select()
      .from(galleryImages)
      .where(eq(galleryImages.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates: any = {};

    // Build update object with provided fields
    if (body.url !== undefined) {
      updates.url = body.url.trim();
    }

    if (body.alt !== undefined) {
      updates.alt = body.alt.trim();
    }

    if (body.year !== undefined) {
      // Validate year if provided
      if (body.year !== '2024' && body.year !== '2025') {
        return NextResponse.json(
          { 
            error: 'Year must be either "2024" or "2025"',
            code: 'INVALID_YEAR' 
          },
          { status: 400 }
        );
      }
      updates.year = body.year.trim();
    }

    // Update the gallery image
    const updated = await db.update(galleryImages)
      .set(updates)
      .where(eq(galleryImages.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Check if record exists
    const existing = await db.select()
      .from(galleryImages)
      .where(eq(galleryImages.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    // Delete the gallery image
    const deleted = await db.delete(galleryImages)
      .where(eq(galleryImages.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      { 
        message: 'Gallery image deleted successfully',
        deletedImage: deleted[0]
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}