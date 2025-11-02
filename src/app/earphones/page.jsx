'use client';
import CategoryBanner from '@/components/Categories/CategoryBanner';
import Categories from '@/components/Categories/Categories';
import AboutFeature from '@/components/FeaturedProducts/AboutFeature';
import Image from 'next/image';
import Link from 'next/link';
import styles from './earphones.module.css';

// Import desktop preview image for the YX1 earphones
import yx1Desktop from '../../assets/product-yx1-earphones/desktop/image-category-page-preview.jpg';

const products = [
  {
    slug: 'yx1-earphones',
    name: 'YX1 Wireless Earphones',
    image: yx1Desktop,
    new: true,
    description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature."
  }
];

export default function EarphonesPage() {
  return (
    <>
      <CategoryBanner title="EARPHONES" />

      <section className={styles.productsList}>
        {products.map((product, index) => (
          <div
            key={product.slug}
            className={`${styles.product} ${index % 2 === 1 ? styles.reverse : ''}`}
          >
            <div className={styles.product__image}>
              <Image 
                src={product.image} 
                alt={product.name}
                width={540}
                height={560}
              />
            </div>

            <div className={styles.product__content}>
              {product.new && <p className={styles.overline}>NEW PRODUCT</p>}
              <h2>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
              <Link href={`/product/${product.slug}`} className={styles.btnPrimary}>
                SEE PRODUCT
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Categories />

      <AboutFeature />
    </>
  );
}