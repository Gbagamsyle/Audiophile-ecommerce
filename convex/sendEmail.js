import { action } from "./_generated/server";
import { Resend } from "resend";

export const sendOrderConfirmation = action(async (ctx, { to, name, orderId, items, subtotal, shipping, tax, grandTotal }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable for Resend. Email not sent.");
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  const resend = new Resend(apiKey);

  // Build HTML for items
  const itemsHtml = (items || []).map(
    item => `<li>${item.name} x${item.quantity} - $${Number(item.price).toLocaleString()}</li>`
  ).join("");

  try {
    console.log('Attempting to send email:', {
      to,
      apiKeyLength: apiKey?.length,
      orderId
    });

    const result = await resend.emails.send({
      from: "Audiophile Store <orders@resend.dev>",
      to,
      subject: `Order Confirmation - #${orderId}`,
      html: `
        <h2>Thank you for your order, ${name}!</h2>
        <p>Your order has been received and is now being processed.</p>
        <ul>${itemsHtml}</ul>
        <p><b>Subtotal:</b> $${Number(subtotal).toLocaleString()}</p>
        <p><b>Shipping:</b> $${Number(shipping).toLocaleString()}</p>
        <p><b>Tax:</b> $${Number(tax).toLocaleString()}</p>
        <p><b>Grand Total:</b> $${Number(grandTotal).toLocaleString()}</p>
        <p><a href="https://yourdomain.com/orders/${orderId}">View your order</a></p>
        <p>If you have any questions, contact us at support@yourdomain.com</p>
      `,
    });

    console.log('Email sent successfully:', { to, orderId });
    return { success: true, emailId: result.id };
  } catch (error) {
    console.error("Resend Error:", error);
    // Provide more detailed error info to help debug issues
    return { 
      success: false, 
      error: error.message,
      details: {
        code: error.statusCode,
        name: error.name,
        type: error.type
      }
    };
  }
});
