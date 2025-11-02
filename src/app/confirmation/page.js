"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import "../../styles/checkout.css";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");

  // fetch order via Convex query
  const order = useQuery(orderId ? "getOrder" : null, orderId);

  if (!orderId) {
    return (
      <main className="container">
        <h1>Order Confirmation</h1>
        <p>No order id provided.</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="container">
        <h1>Order Confirmation</h1>
        <p>Loading your order...</p>
      </main>
    );
  }

  const { name, items, subtotal, shipping, tax, grandTotal } = order;

  return (
    <main className="container confirmation-page">
      <section>
        <h1>Thank you, {name}!</h1>
        <p>Your order <strong>#{order._id || orderId}</strong> has been received.</p>

        <h2>Order Summary</h2>
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              {it.name} — {it.quantity} × $ {it.price.toLocaleString()}
            </li>
          ))}
        </ul>

        <div className="order-totals">
          <div className="order-row">
            <span>Subtotal</span>
            <strong>$ {subtotal.toLocaleString()}</strong>
          </div>
          <div className="order-row">
            <span>Shipping</span>
            <strong>$ {shipping.toLocaleString()}</strong>
          </div>
          <div className="order-row">
            <span>Tax</span>
            <strong>$ {tax.toLocaleString()}</strong>
          </div>
          <div className="order-row grand-total">
            <span>Grand Total</span>
            <strong>$ {grandTotal.toLocaleString()}</strong>
          </div>
        </div>

        <p>If you have any questions, contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
      </section>
    </main>
  );
}
