import { mutation, query, action } from "./_generated/server";
import { sendOrderConfirmation } from "./sendEmail.js";

export const createOrder = mutation(async (ctx, orderData) => {
  const {
    name,
    email,
    phone,
    address,
    items,
    subtotal,
    shipping,
    tax,
    grandTotal,
  } = orderData;

  const orderId = await ctx.db.insert("orders", {
    name,
    email,
    phone,
    address,
    items,
    subtotal,
    shipping,
    tax,
    grandTotal,
    status: "pending",
    createdAt: Date.now(),
  });

  // 📨 Trigger email notification
  await ctx.scheduler.runAfter(0, "sendEmail:sendOrderConfirmation", {
    to: email,
    name,
    orderId,
  });

  return orderId;
});
