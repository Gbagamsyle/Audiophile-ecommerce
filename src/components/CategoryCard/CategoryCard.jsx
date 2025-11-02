'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.css';
import arrowRight from '../../assets/shared/desktop/icon-arrow-right.svg';

const CategoryCard = ({ title, image, link }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          className={styles.image}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={link} className={styles.shopLink}>
          SHOP
          <Image
            src={arrowRight}
            alt=""
            width={8}
            height={12}
            className={styles.arrow}
          />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;