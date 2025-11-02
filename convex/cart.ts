import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// create a cart
export const createCart = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    const cartId = await ctx.db.insert("carts", {
      userId: args.userId,
      items: [],
      createdAt: now,
      updatedAt: now,
      status: 'active',
    });
    return cartId;
  },
});

// add or update item in cart
export const addItemToCart = mutation({
  args: {
    userId: v.string(),
    item: v.object({
      id: v.string(),
      name: v.string(),
      price: v.float64(),
      quantity: v.float64(),
      imageUrl: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!cart) {
      throw new Error("Cart not found for this user");
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.id === args.item.id);
    const now = Date.now();
    
    let updatedItems;
    if (existingItemIndex >= 0) {
      // Update existing item
      updatedItems = [...cart.items];
      updatedItems[existingItemIndex] = {
        ...args.item,
        updatedAt: now,
      };
    } else {
      // Add new item
      updatedItems = [...cart.items, { ...args.item, updatedAt: now }];
    }

    // Update cart with new items and timestamp
    await ctx.db.patch(cart._id, {
      items: updatedItems,
      updatedAt: now,
    });

    return updatedItems;
  },
});

// get cart items
export const getCart = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    return cart || null;
  },
});

// clear cart
export const clearCart = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!cart) return null;

    const now = Date.now();
    await ctx.db.patch(cart._id, {
      items: [],
      updatedAt: now,
      status: 'active'
    });
    return true;
  },
});
