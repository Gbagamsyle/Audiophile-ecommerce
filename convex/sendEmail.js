import { action } from "./_generated/server";
import { Resend } from "resend";

export const sendOrderConfirmation = action(async (ctx, { to, name, orderId }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Your Store <orders@yourdomain.com>", // Replace with your verified sender
      to,
      subject: `Order Confirmation - #${orderId}`,
      html: `
        <h2>Thank you for your order, ${name}!</h2>
        <p>Your order has been received and is now being processed.</p>
        <p><b>Order ID:</b> ${orderId}</p>
        <p>We’ll notify you once your items are shipped.</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Error:", error);
    return { success: false, error: error.message };
  }
});
