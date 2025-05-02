import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import User from '../../models/User';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {
  await dbConnect();
  
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature || !WEBHOOK_SECRET) {
    return new Response('Error occurred', { status: 400 });
  }

  const payload = await req.json();
  const wh = new Webhook(WEBHOOK_SECRET);
  
  try {
    const evt: WebhookEvent = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    if (evt.type === 'user.created') {
      const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;

      await User.create({
        clerkUserId: id,
        email: email_addresses[0].email_address,
        username: username || email_addresses[0].email_address.split('@')[0],
        firstName: first_name,
        lastName: last_name,
        profileImage: image_url,
      });
    }

    return new Response('', { status: 200 });
  } catch (err) {
    return new Response('Error occurred', { status: 400 });
  }
}