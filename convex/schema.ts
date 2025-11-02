// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    userId: v.string(),
    // Customer details
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    // Order items
    items: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.float64(),
      quantity: v.float64(),
      imageUrl: v.optional(v.string()),
    })),
    // Payment details
    paymentMethod: v.optional(v.string()),
    paymentStatus: v.optional(v.string()),
    // Order totals
    subtotal: v.float64(),
    shipping: v.float64(),
    tax: v.float64(),
    grandTotal: v.float64(),
    // Order status and metadata
    status: v.string(),
    notes: v.optional(v.string()),
    createdAt: v.float64(),
    updatedAt: v.float64(),
  }).index("by_userId", ["userId"]),

  carts: defineTable({
    userId: v.string(),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.float64(),
        quantity: v.float64(),
        imageUrl: v.string(),
        updatedAt: v.number(), // Track when each item was last modified
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(), // Track when the cart was last modified
    status: v.string(), // Can be 'active', 'checkout', 'completed'
  }).index("by_userId", ["userId"]),
});
