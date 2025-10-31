import React from "react";
import "../styles/order.css";

export default function OrderSummary() {
  const cartItems = [
    { id: 1, name: "XX99 MK II", price: 2999, quantity: 1, image: "/images/cart/image-xx99-mark-two-headphones.jpg" },
    { id: 2, name: "ZX9 Speaker", price: 4500, quantity: 1, image: "/images/cart/image-zx9-speaker.jpg" },
  ];

  const shipping = 50;
  const vat = 1079;
  const grandTotal =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + shipping + vat;

  return (
    <aside className="order-summary">
      <h2>Summary</h2>

      <ul className="order-items">
        {cartItems.map((item) => (
          <li key={item.id} className="order-item">
            <div className="order-item-left">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-price">$ {item.price.toLocaleString()}</p>
              </div>
            </div>
            <p className="item-qty">x{item.quantity}</p>
          </li>
        ))}
      </ul>

      <div className="order-totals">
        <div className="order-row">
          <span>Total</span>
          <strong>$ {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}</strong>
        </div>

        <div className="order-row">
          <span>Shipping</span>
          <strong>$ {shipping.toLocaleString()}</strong>
        </div>

        <div className="order-row">
          <span>VAT (Included)</span>
          <strong>$ {vat.toLocaleString()}</strong>
        </div>

        <div className="order-row grand-total">
          <span>Grand Total</span>
          <strong>$ {grandTotal.toLocaleString()}</strong>
        </div>
      </div>

      <button type="submit" className="btn-checkout">Continue & Pay</button>
    </aside>
  );
}
