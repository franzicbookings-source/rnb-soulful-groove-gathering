import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { competitionEntries } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

const VALID_GENDERS = ['Male', 'Female', 'Other'];
const MIN_AGE = 1;
const MAX_AGE = 120;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, gender, age, photoUrl, email } = body;

    // Validate firstName
    if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
      return NextResponse.json(
        { error: 'First name is required', code: 'MISSING_FIRST_NAME' },
        { status: 400 }
      );
    }

    // Validate lastName
    if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
      return NextResponse.json(
        { error: 'Last name is required', code: 'MISSING_LAST_NAME' },
        { status: 400 }
      );
    }

    // Validate gender
    if (!gender || typeof gender !== 'string') {
      return NextResponse.json(
        { error: 'Gender is required', code: 'MISSING_GENDER' },
        { status: 400 }
      );
    }

    if (!VALID_GENDERS.includes(gender)) {
      return NextResponse.json(
        { 
          error: `Gender must be one of: ${VALID_GENDERS.join(', ')}`, 
          code: 'INVALID_GENDER' 
        },
        { status: 400 }
      );
    }

    // Validate age
    if (age === undefined || age === null) {
      return NextResponse.json(
        { error: 'Age is required', code: 'MISSING_AGE' },
        { status: 400 }
      );
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < MIN_AGE || ageNumber > MAX_AGE) {
      return NextResponse.json(
        { 
          error: `Age must be a positive integer between ${MIN_AGE} and ${MAX_AGE}`, 
          code: 'INVALID_AGE' 
        },
        { status: 400 }
      );
    }

    // Validate photoUrl
    if (!photoUrl || typeof photoUrl !== 'string' || photoUrl.trim() === '') {
      return NextResponse.json(
        { error: 'Photo URL is required', code: 'MISSING_PHOTO_URL' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData: any = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender: gender,
      age: ageNumber,
      photoUrl: photoUrl.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Handle optional email
    if (email && typeof email === 'string' && email.trim() !== '') {
      sanitizedData.email = email.trim().toLowerCase();
    }

    // Insert into database
    const newEntry = await db.insert(competitionEntries)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newEntry[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Handle single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const entry = await db.select()
        .from(competitionEntries)
        .where(eq(competitionEntries.id, parseInt(id)))
        .limit(1);

      if (entry.length === 0) {
        return NextResponse.json(
          { error: 'Competition entry not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(entry[0], { status: 200 });
    }

    // Handle list with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const genderFilter = searchParams.get('gender');

    let query = db.select().from(competitionEntries);

    // Build conditions array
    const conditions = [];

    // Add search condition
    if (search && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      conditions.push(
        or(
          like(competitionEntries.firstName, searchTerm),
          like(competitionEntries.lastName, searchTerm),
          like(competitionEntries.email, searchTerm)
        )
      );
    }

    // Add gender filter
    if (genderFilter && VALID_GENDERS.includes(genderFilter)) {
      conditions.push(eq(competitionEntries.gender, genderFilter));
    }

    // Apply conditions if any exist
    if (conditions.length > 0) {
      if (conditions.length === 1) {
        query = query.where(conditions[0]);
      } else {
        query = query.where(and(...conditions));
      }
    }

    // Apply ordering, pagination and execute
    const results = await query
      .orderBy(desc(competitionEntries.submittedAt))
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