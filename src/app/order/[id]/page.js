"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import "../../../styles/order.css";
import "../../../styles/checkout.css";

export default function OrderPage() {
  const params = useParams();
  const id = params?.id;

  const order = useQuery(id ? "getOrder" : null, id);

  if (!id) return <main className="container"><p>Order id missing.</p></main>;
  if (!order) return <main className="container"><p>Loading order...</p></main>;

  const { name, email, phone, address, items = [], subtotal = 0, shipping = 0, tax = 0, grandTotal = 0, status } = order;

  return (
    <main className="container site-container">
      <section style={{ maxWidth: 900, margin: "2rem auto" }}>
        <h1>Order #{order._id || id}</h1>
        <p style={{ marginBottom: 12 }}>Status: <strong>{status}</strong></p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div>
            <h2>Shipping Details</h2>
            <p><strong>{name}</strong></p>
            <p>{email}</p>
            <p>{phone}</p>
            <p>{address}</p>

            <h2 style={{ marginTop: 18 }}>Items</h2>
            <ul className="order-items">
              {items.map((it) => (
                <li key={it.id} className="order-item">
                  <div className="order-item-left">
                      <Image src={it.image || "/assets/placeholder.png"} alt={it.name} width={64} height={64} className="order-item-img" />
                      <div>
                        <p className="item-name">{it.name}</p>
                        <p className="item-price">$ {it.price.toLocaleString()}</p>
                      </div>
                    </div>
                  <p className="item-qty">x{it.quantity}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="order-summary">
            <h2>Summary</h2>
            <div className="order-totals">
              <div className="order-row"><span>Subtotal</span><strong>$ {subtotal.toLocaleString()}</strong></div>
              <div className="order-row"><span>Shipping</span><strong>$ {shipping.toLocaleString()}</strong></div>
              <div className="order-row"><span>Tax</span><strong>$ {tax.toLocaleString()}</strong></div>
              <div className="order-row grand-total"><span>Grand Total</span><strong>$ {grandTotal.toLocaleString()}</strong></div>
            </div>
            <button className="btn-checkout">Need help? Contact support</button>
          </aside>
        </div>
      </section>
    </main>
  );
}
