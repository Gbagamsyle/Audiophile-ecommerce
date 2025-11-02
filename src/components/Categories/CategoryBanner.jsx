'use client';

import styles from './CategoryBanner.module.css';

const CategoryBanner = ({ title }) => {
  return (
    <section className={styles.banner}>
      <h1>{title}</h1>
    </section>
  );
};

export default CategoryBanner;
