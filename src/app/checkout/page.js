'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";
import OrderConfirmationModal from "@/components/OrderConfirmationModal"; // ✅ Import modal
import "@/styles/checkout.css";

export default function Checkout() {
  const router = useRouter();
  const userId = "demo-user"; // Replace with real user ID once you integrate auth

  // 🛒 Get cart data
  const cart = useQuery(api.cart.getCart, { userId });
  const cartItems = cart?.items || [];

  // 🧾 Local states
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showModal, setShowModal] = React.useState(false); // ✅ control modal visibility
  const [grandTotal, setGrandTotal] = React.useState(0);   // ✅ store total for modal

  // ⚙️ Convex mutations
  const createOrder = useMutation(api.orders.createOrder);
  const clearCart = useMutation(api.cart.clearCart);
  const sendOrderConfirmation = useAction(api.sendEmail.sendOrderConfirmation);

  // 🧩 Handle checkout form submission
  const handleSubmit = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty!");
      return;
    }

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shipping = 50;
    const tax = Math.round(subtotal * 0.2);
    const total = subtotal + shipping + tax;

    setGrandTotal(total);

    try {
      // Clean items to match the Convex validator (strip any DB metadata like updatedAt)
      const cleanedItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        ...(item.imageUrl ? { imageUrl: item.imageUrl } : {}),
      }));

      const orderId = await createOrder({
        ...formData,
        userId,
        items: cleanedItems,
        subtotal,
        shipping,
        tax,
        grandTotal: total,
        status: "pending",
        createdAt: Date.now(),
      });

      // Send confirmation email via Convex action (Resend)
      try {
        console.log('Starting email confirmation...', {
          to: formData.email,
          orderId,
          itemCount: cleanedItems.length
        });
        
        const emailResult = await sendOrderConfirmation({
          to: formData.email,
          name: formData.name,
          orderId,
          items: cleanedItems,
          subtotal,
          shipping,
          tax,
          grandTotal: total,
        });

        console.log('Email confirmation result:', emailResult);
        
        if (!emailResult?.success) {
          console.warn('Email send failed:', {
            error: emailResult?.error,
            details: emailResult?.details
          });
          alert(`Order created but email failed: ${emailResult?.error || 'Unknown error'}`);
        } else {
          console.log('Email sent successfully', {
            emailId: emailResult.emailId
          });
        }
      } catch (emailErr) {
        console.error('Failed to send confirmation email via Convex action:', emailErr);
      }

      await clearCart({ userId });
      setShowModal(true); // ✅ Show the modal right here
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <main className="checkout-page">
      <div className="checkout-wrapper">
        <button onClick={() => router.back()} className="go-back">
          Go Back
        </button>

        <section className="checkout-container">
          <CheckoutForm
            cartItems={cartItems}
            onFormDataChange={setFormData}
          />

          <OrderSummary
            cartItems={cartItems}
            userId={userId}
            formData={formData}
            onSubmit={handleSubmit} // ✅ send handler to summary
          />
        </section>

        {/* ✅ Order confirmation modal */}
        <OrderConfirmationModal
          open={showModal}
          onClose={() => setShowModal(false)}
          grandTotal={grandTotal}
        />
      </div>
    </main>
  );
}
