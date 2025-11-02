'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

const ProductCard = ({ slug, name, image, isNew, description, reverse }) => {
  return (
    <article className={`${styles.card} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.imageWrap}>
        <Image src={image} alt={name} fill className={styles.image} sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div className={styles.content}>
        {isNew && <p className={styles.new}>NEW PRODUCT</p>}
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{description}</p>
        <Link href={`/product/${slug}`} className={styles.cta}>SEE PRODUCT</Link>
      </div>
    </article>
  );
};

export default ProductCard;
