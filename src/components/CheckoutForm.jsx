// src/components/CheckoutForm.jsx
import React from "react";
import "../styles/checkout.css";

export default function CheckoutForm({ onFormDataChange }) {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    onFormDataChange((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
      <h1>Checkout</h1>

      {/* Billing Details */}
      <section className="form-section">
        <h2>Billing Details</h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Alexei Ward" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="alexei@mail.com" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" placeholder="+1 202-555-0136" onChange={handleInputChange} required />
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="form-section">
        <h2>Shipping Info</h2>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="address">Your Address</label>
            <input id="address" type="text" placeholder="1137 Williams Avenue" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="zip">ZIP Code</label>
            <input id="zip" type="text" placeholder="10001" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input id="city" type="text" placeholder="New York" />
          </div>
          <div className="form-group full-width">
            <label htmlFor="country">Country</label>
            <input id="country" type="text" placeholder="United States" />
          </div>
        </div>
      </section>

      {/* Payment Details */}
      <section className="form-section">
        <h2>Payment Details</h2>

        <div className="payment-method">
          <label>Payment Method</label>
          <div className="radio-group">
            <label className="radio">
              <input type="radio" name="payment" value="e-money" defaultChecked />
              <span>e-Money</span>
            </label>
            <label className="radio">
              <input type="radio" name="payment" value="cash" />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <div className="payment-fields">
          <div className="form-group">
            <label htmlFor="eMoneyNumber">e-Money Number</label>
            <input id="eMoneyNumber" type="text" placeholder="238521993" />
          </div>
          <div className="form-group">
            <label htmlFor="eMoneyPin">e-Money PIN</label>
            <input id="eMoneyPin" type="text" placeholder="6891" />
          </div>
        </div>
      </section>
    </form>
  );
}