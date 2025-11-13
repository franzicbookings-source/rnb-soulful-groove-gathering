import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { partners } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const partner = await db
        .select()
        .from(partners)
        .where(eq(partners.id, parseInt(id)))
        .limit(1);

      if (partner.length === 0) {
        return NextResponse.json(
          { error: 'Partner not found', code: 'PARTNER_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(partner[0], { status: 200 });
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(partners);

    if (search) {
      query = query.where(like(partners.name, `%${search}%`));
    }

    const results = await query.limit(limit).offset(offset);

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
    const { name, logo, website } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!logo) {
      return NextResponse.json(
        { error: 'Logo is required', code: 'MISSING_LOGO' },
        { status: 400 }
      );
    }

    const sanitizedName = name.trim();
    const sanitizedLogo = logo.trim();
    const sanitizedWebsite = website ? website.trim() : null;

    const newPartner = await db
      .insert(partners)
      .values({
        name: sanitizedName,
        logo: sanitizedLogo,
        website: sanitizedWebsite,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newPartner[0], { status: 201 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(partners)
      .where(eq(partners.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Partner not found', code: 'PARTNER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates: any = {};

    if (body.name !== undefined) {
      updates.name = body.name.trim();
    }

    if (body.logo !== undefined) {
      updates.logo = body.logo.trim();
    }

    if (body.website !== undefined) {
      updates.website = body.website ? body.website.trim() : null;
    }

    const updated = await db
      .update(partners)
      .set(updates)
      .where(eq(partners.id, parseInt(id)))
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(partners)
      .where(eq(partners.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Partner not found', code: 'PARTNER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(partners)
      .where(eq(partners.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Partner deleted successfully',
        partner: deleted[0],
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