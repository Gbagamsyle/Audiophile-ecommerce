import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new order
export const createOrder = mutation({
  args: {
    userId: v.string(),
    // Customer details
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    // Order items
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.float64(),
        quantity: v.float64(),
        imageUrl: v.optional(v.string())
      })
    ),
    // Order totals
    subtotal: v.float64(),
    shipping: v.float64(),
    tax: v.float64(),
    grandTotal: v.float64(),
    // Optional timestamps (some callers may include these)
    createdAt: v.optional(v.float64()),
    updatedAt: v.optional(v.float64()),
    // Optional fields
    notes: v.optional(v.string()),
    status: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    paymentStatus: v.optional(v.string())
  },

  handler: async (ctx, orderData) => {
    // Basic validation
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error("Invalid order data: items empty");
    }

    const now = Date.now();

    // Insert the order, ensuring server-generated timestamps and defaults
    const orderId = await ctx.db.insert("orders", {
      ...orderData,
      status: orderData.status ?? "pending",
      paymentStatus: orderData.paymentStatus ?? "pending",
      createdAt: orderData.createdAt ?? now,
      updatedAt: orderData.updatedAt ?? now
    });

    return orderId;
  }
});

// Get a specific order by ID
export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    return await ctx.db.get(orderId);
  },
});

// Get all orders for a specific user
export const getUserOrders = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// Update order status
export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, { orderId, status }) => {
    const order = await ctx.db.get(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    await ctx.db.patch(orderId, {
      status,
      updatedAt: Date.now(),
    });

    return true;
  },
});

// Update payment status
export const updatePaymentStatus = mutation({
  args: {
    orderId: v.id("orders"),
    paymentStatus: v.string(),
  },
  handler: async (ctx, { orderId, paymentStatus }) => {
    const order = await ctx.db.get(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    await ctx.db.patch(orderId, {
      paymentStatus,
      updatedAt: Date.now(),
    });

    return true;
  },
});
