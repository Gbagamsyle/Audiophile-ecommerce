"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../styles/order.css";
import OrderConfirmationModal from "./OrderConfirmationModal";

export default function OrderSummary({ cartItems = [], onSubmit, userId, formData = {} }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shipping = cartItems.length > 0 ? 50 : 0;
  const vat = Math.round(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.2);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = subtotal + shipping + vat;

  if (cartItems.length === 0) {
    return (
      <aside className="order-summary">
        <h2>Summary</h2>
        <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>Your cart is empty</p>
      </aside>
    );
  }

  return (
    <aside className="order-summary">
      <h2>Summary</h2>

      <ul className="order-items">
        {cartItems.map((item) => (
          <li key={item.id} className="order-item">
            <div className="order-item-left">
              <Image src={item.imageUrl || "/assets/placeholder.png"} alt={item.name} width={64} height={64} className="order-item-img" />
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-price">$ {item.price}</p>
              </div>
            </div>
            <p className="item-qty">×{item.quantity}</p>
          </li>
        ))}
      </ul>

      <div className="order-totals">
        <div className="order-row">
          <span>TOTAL</span>
          <strong>$ {subtotal}</strong>
        </div>
        <div className="order-row">
          <span>SHIPPING</span>
          <strong>$ {shipping}</strong>
        </div>
        <div className="order-row">
          <span>VAT (INCLUDED)</span>
          <strong>$ {vat}</strong>
        </div>
        <div className="order-row grand-total">
          <span>GRAND TOTAL</span>
          <strong>$ {grandTotal}</strong>
        </div>
      </div>

      <button 
        type="button" 
        className="btn-checkout"
        onClick={async () => {
          if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
          }

          // Check if form is filled out
          if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert("Please fill out all required fields in the form.");
            return;
          }

          setIsSubmitting(true);
          try {
            console.log('Calling parent onSubmit handler');
            if (typeof onSubmit !== 'function') {
              throw new Error('onSubmit handler is not a function');
            }

            await onSubmit();
            console.log('Parent onSubmit completed');
          } catch (error) {
            console.error('Order submission failed:', error);
            alert(error?.message || "Failed to create order. Please try again.");
          } finally {
            setIsSubmitting(false);
          }
        }}
        disabled={isSubmitting || cartItems.length === 0}
      >
        {isSubmitting ? 'Processing...' : 'Continue & Pay'}
      </button>

      <OrderConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        grandTotal={grandTotal}
      />
    </aside>
  );
}
