import db from '../../../db';
import { eq } from 'drizzle-orm';
import { advocates } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';

export async function GET() {
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

    // TODO: Type below?
    const updated = await (db as any)
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

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing advocate ID' }), {
        status: 400,
      });
    }

    const deleted = await (db as any)
      .delete(advocates)
      .where(eq(advocates.id, Number(id)))
      .returning();

    if (deleted.length === 0) {
      return new Response(JSON.stringify({ error: 'Advocate not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ data: deleted }), { status: 200 });
  } catch (err) {
    console.error('DELETE route error:', err);
    return new Response(JSON.stringify({ error: 'Delete failed' }), {
      status: 500,
    });
  }
}
