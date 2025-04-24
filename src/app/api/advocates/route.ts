import db from '../../../db';
import { eq } from 'drizzle-orm';

import { advocates } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';

export async function GET() {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);
  return Response.json({ data });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log('Incoming PUT body:', body);
    // Remove createdAt. Not updating that
    const { id, createdAt, ...updates } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing advocate ID' }), {
        status: 400,
      });
    }

    const updated = await db
      .update(advocates)
      .set(updates)
      .where(eq(advocates.id, Number(id)))
      .returning();

    return new Response(JSON.stringify({ data: updated }), { status: 200 });
  } catch (err) {
    console.error('PUT route error:', err);
    return new Response(JSON.stringify({ error: 'Update failed' }), {
      status: 500,
    });
  }
}
