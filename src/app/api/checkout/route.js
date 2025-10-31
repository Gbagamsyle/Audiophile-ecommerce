// src/app/api/checkout/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    // Example: Extract user info and order
    const { name, email, orderId, items } = data;

    // Example: Send email
    const response = await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>', // or your verified domain
      to: email,
      subject: `Order Confirmation #${orderId}`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for your order! 🎧</p>
        <p>Your order ID: <strong>${orderId}</strong></p>
        <ul>
          ${items.map((item) => `<li>${item.name} × ${item.quantity}</li>`).join('')}
        </ul>
        <p>We’ll notify you once it ships.</p>
      `,
    });

    return Response.json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error });
  }
}
