import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import "../styles/checkout.css"; // general checkout layout

export default function Checkout() {
  return (
    <main className="checkout-page">
      <section className="checkout-container">
        <CheckoutForm />
        <OrderSummary />
      </section>
    </main>
  );
}
