import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { volunteerApplications } from '@/db/schema';
import { eq, like, or, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const application = await db.select()
        .from(volunteerApplications)
        .where(eq(volunteerApplications.id, parseInt(id)))
        .limit(1);

      if (application.length === 0) {
        return NextResponse.json({ 
          error: 'Volunteer application not found',
          code: "NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(application[0], { status: 200 });
    }

    // List with pagination, filtering, and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const areaOfInterest = searchParams.get('areaOfInterest');

    let query = db.select().from(volunteerApplications);

    // Build conditions array
    const conditions = [];

    // Search by name or email
    if (search) {
      conditions.push(
        or(
          like(volunteerApplications.name, `%${search}%`),
          like(volunteerApplications.email, `%${search}%`)
        )
      );
    }

    // Filter by status
    if (status) {
      conditions.push(eq(volunteerApplications.status, status));
    }

    // Filter by areaOfInterest
    if (areaOfInterest) {
      conditions.push(eq(volunteerApplications.areaOfInterest, areaOfInterest));
    }

    // Apply all conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, areaOfInterest, message, status } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ 
        error: "Name is required",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ 
        error: "Email is required",
        code: "MISSING_EMAIL" 
      }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ 
        error: "Phone is required",
        code: "MISSING_PHONE" 
      }, { status: 400 });
    }

    if (!areaOfInterest) {
      return NextResponse.json({ 
        error: "Area of interest is required",
        code: "MISSING_AREA_OF_INTEREST" 
      }, { status: 400 });
    }

    // Validate areaOfInterest enum
    const validAreas = ['guest-services', 'stage-support', 'event-operations', 'community-engagement'];
    if (!validAreas.includes(areaOfInterest)) {
      return NextResponse.json({ 
        error: "Invalid area of interest. Must be one of: guest-services, stage-support, event-operations, community-engagement",
        code: "INVALID_AREA_OF_INTEREST" 
      }, { status: 400 });
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['pending', 'approved', 'rejected'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ 
          error: "Invalid status. Must be one of: pending, approved, rejected",
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      areaOfInterest: areaOfInterest.trim(),
      message: message ? message.trim() : null,
      status: status || 'pending',
      createdAt: new Date().toISOString()
    };

    const newApplication = await db.insert(volunteerApplications)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newApplication[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(volunteerApplications)
      .where(eq(volunteerApplications.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Volunteer application not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const { name, email, phone, areaOfInterest, message, status } = body;

    // Validate areaOfInterest if provided
    if (areaOfInterest) {
      const validAreas = ['guest-services', 'stage-support', 'event-operations', 'community-engagement'];
      if (!validAreas.includes(areaOfInterest)) {
        return NextResponse.json({ 
          error: "Invalid area of interest. Must be one of: guest-services, stage-support, event-operations, community-engagement",
          code: "INVALID_AREA_OF_INTEREST" 
        }, { status: 400 });
      }
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['pending', 'approved', 'rejected'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ 
          error: "Invalid status. Must be one of: pending, approved, rejected",
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
    }

    // Build update object with only provided fields
    const updates: any = {};
    if (name !== undefined) updates.name = name.trim();
    if (email !== undefined) updates.email = email.trim().toLowerCase();
    if (phone !== undefined) updates.phone = phone.trim();
    if (areaOfInterest !== undefined) updates.areaOfInterest = areaOfInterest.trim();
    if (message !== undefined) updates.message = message ? message.trim() : null;
    if (status !== undefined) updates.status = status.trim();

    const updated = await db.update(volunteerApplications)
      .set(updates)
      .where(eq(volunteerApplications.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(volunteerApplications)
      .where(eq(volunteerApplications.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Volunteer application not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const deleted = await db.delete(volunteerApplications)
      .where(eq(volunteerApplications.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Volunteer application deleted successfully',
      deletedApplication: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}