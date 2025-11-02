'use client';

import Image from 'next/image';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ userId, open, onClose }) {
  // Get cart data
  const cart = useQuery(api.cart.getCart, { userId });
  const clearCart = useMutation(api.cart.clearCart);
  const addItemToCart = useMutation(api.cart.addItemToCart);
  
  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
  <div
    className={`${styles.overlay} ${open ? styles.open : ''}`}
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose && onClose();
    }}
  >
    <div className={styles.cartModal} role="dialog" aria-hidden={!open}>
      <div className={styles.header}>
        <h3 className={styles.title}>CART ({items.length})</h3>
        <button
          className={styles.removeAll}
          onClick={async () => {
            try {
              await clearCart({ userId });
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Remove all
        </button>
      </div>

      <div className={styles.items}>
        {items.length === 0 && (
          <p style={{ color: '#7d7d7d' }}>Your cart is empty.</p>
        )}

        {items.map((item) => (
          <div key={item.id || item.name} className={styles.item}>
            <div className={styles.thumbWrap}>
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className={styles.thumb}
                />
              )}
            </div>

            <div className={styles.details}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.price}>$ {item.price.toLocaleString()}</p>
            </div>

            <div className={styles.qtyControl}>
              <button
                className={styles.qtyBtn}
                onClick={async () => {
                  try {
                    const newQuantity = Math.max(1, item.quantity - 1);
                    await addItemToCart({
                      userId,
                      item: {
                        ...item,
                        quantity: newQuantity
                      }
                    });
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                -
              </button>
              <span className={styles.qty}>{item.quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={async () => {
                  try {
                    await addItemToCart({
                      userId,
                      item: {
                        ...item,
                        quantity: item.quantity + 1
                      }
                    });
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>TOTAL</span>
            <span className={styles.totalValue}>$ {subtotal.toLocaleString()}</span>
          </div>

          <button className={styles.checkoutBtn} onClick={() => window.location.href = '/checkout'}>
            CHECKOUT
          </button>
        </>
      )}
    </div>
  </div>
  );
}
