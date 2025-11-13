import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { artists } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const artist = await db
        .select()
        .from(artists)
        .where(eq(artists.id, parseInt(id)))
        .limit(1);

      if (artist.length === 0) {
        return NextResponse.json(
          { error: 'Artist not found', code: 'ARTIST_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(artist[0], { status: 200 });
    }

    // List with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(artists).orderBy(desc(artists.createdAt));

    if (search) {
      query = query.where(
        or(
          like(artists.name, `%${search}%`),
          like(artists.station, `%${search}%`),
          like(artists.genre, `%${search}%`)
        )
      );
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
    const { name, station, image, bio, genre, experience, speciality } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!station || !station.trim()) {
      return NextResponse.json(
        { error: 'Station is required', code: 'MISSING_STATION' },
        { status: 400 }
      );
    }

    if (!image || !image.trim()) {
      return NextResponse.json(
        { error: 'Image URL is required', code: 'MISSING_IMAGE' },
        { status: 400 }
      );
    }

    if (!bio || !bio.trim()) {
      return NextResponse.json(
        { error: 'Bio is required', code: 'MISSING_BIO' },
        { status: 400 }
      );
    }

    if (!genre || !genre.trim()) {
      return NextResponse.json(
        { error: 'Genre is required', code: 'MISSING_GENRE' },
        { status: 400 }
      );
    }

    if (!experience || !experience.trim()) {
      return NextResponse.json(
        { error: 'Experience is required', code: 'MISSING_EXPERIENCE' },
        { status: 400 }
      );
    }

    if (!speciality || !speciality.trim()) {
      return NextResponse.json(
        { error: 'Speciality is required', code: 'MISSING_SPECIALITY' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      station: station.trim(),
      image: image.trim(),
      bio: bio.trim(),
      genre: genre.trim(),
      experience: experience.trim(),
      speciality: speciality.trim(),
      createdAt: new Date().toISOString(),
    };

    const newArtist = await db
      .insert(artists)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newArtist[0], { status: 201 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if artist exists
    const existingArtist = await db
      .select()
      .from(artists)
      .where(eq(artists.id, parseInt(id)))
      .limit(1);

    if (existingArtist.length === 0) {
      return NextResponse.json(
        { error: 'Artist not found', code: 'ARTIST_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates: any = {};

    // Only include fields that are provided in the request
    if (body.name !== undefined) {
      if (!body.name.trim()) {
        return NextResponse.json(
          { error: 'Name cannot be empty', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updates.name = body.name.trim();
    }

    if (body.station !== undefined) {
      if (!body.station.trim()) {
        return NextResponse.json(
          { error: 'Station cannot be empty', code: 'INVALID_STATION' },
          { status: 400 }
        );
      }
      updates.station = body.station.trim();
    }

    if (body.image !== undefined) {
      if (!body.image.trim()) {
        return NextResponse.json(
          { error: 'Image URL cannot be empty', code: 'INVALID_IMAGE' },
          { status: 400 }
        );
      }
      updates.image = body.image.trim();
    }

    if (body.bio !== undefined) {
      if (!body.bio.trim()) {
        return NextResponse.json(
          { error: 'Bio cannot be empty', code: 'INVALID_BIO' },
          { status: 400 }
        );
      }
      updates.bio = body.bio.trim();
    }

    if (body.genre !== undefined) {
      if (!body.genre.trim()) {
        return NextResponse.json(
          { error: 'Genre cannot be empty', code: 'INVALID_GENRE' },
          { status: 400 }
        );
      }
      updates.genre = body.genre.trim();
    }

    if (body.experience !== undefined) {
      if (!body.experience.trim()) {
        return NextResponse.json(
          { error: 'Experience cannot be empty', code: 'INVALID_EXPERIENCE' },
          { status: 400 }
        );
      }
      updates.experience = body.experience.trim();
    }

    if (body.speciality !== undefined) {
      if (!body.speciality.trim()) {
        return NextResponse.json(
          { error: 'Speciality cannot be empty', code: 'INVALID_SPECIALITY' },
          { status: 400 }
        );
      }
      updates.speciality = body.speciality.trim();
    }

    const updatedArtist = await db
      .update(artists)
      .set(updates)
      .where(eq(artists.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedArtist[0], { status: 200 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if artist exists
    const existingArtist = await db
      .select()
      .from(artists)
      .where(eq(artists.id, parseInt(id)))
      .limit(1);

    if (existingArtist.length === 0) {
      return NextResponse.json(
        { error: 'Artist not found', code: 'ARTIST_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(artists)
      .where(eq(artists.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Artist deleted successfully',
        artist: deleted[0],
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