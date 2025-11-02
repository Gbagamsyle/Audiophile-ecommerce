"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./OrderConfirmationModal.module.css";

export default function OrderConfirmationModal({ open, onClose, grandTotal }) {
  const router = useRouter();

  return (
    <div
      className={`${styles.modalOverlay} ${open ? styles.open : ''}`}
      onClick={e => {
        if (e.target === e.currentTarget) onClose && onClose();
      }}
      aria-hidden={!open}
      role="dialog"
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.checkmark}>✓</div>

        <h1 className={styles.title}>
          THANK YOU
          <span>FOR YOUR ORDER</span>
        </h1>

        <p className={styles.confirmation}>
          You will receive an email confirmation shortly.
        </p>

        <div className={styles.summaryBox}>
          <div className={styles.summaryLeft}>
            {/* reserved for product thumbnail(s) or brief order summary */}
          </div>
          <div className={styles.summaryRight}>
            <div className={styles.summaryLabel}>GRAND TOTAL</div>
            <div className={styles.summaryAmount}>$ {grandTotal?.toLocaleString?.()}</div>
          </div>
        </div>

        <button className={styles.backButton} onClick={() => router.push("/")}>
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}
