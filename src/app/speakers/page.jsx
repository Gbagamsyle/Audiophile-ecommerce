'use client';
import CategoryBanner from '@/components/Categories/CategoryBanner';
import Categories from '@/components/Categories/Categories';
import AboutFeature from '@/components/FeaturedProducts/AboutFeature';
import Image from 'next/image';
import Link from 'next/link';
import styles from './speakers.module.css';

// Import desktop preview images for the speakers
import zx9Desktop from '../../assets/product-zx9-speaker/desktop/image-category-page-preview.jpg';
import zx7Desktop from '../../assets/product-zx7-speaker/desktop/image-category-page-preview.jpg';

const products = [
  {
    slug: 'zx9-speaker',
    name: 'ZX9 Speaker',
    image: zx9Desktop,
    new: true,
    description: "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups."
  },
  {
    slug: 'zx7-speaker',
    name: 'ZX7 Speaker',
    image: zx7Desktop,
    new: false,
    description: 'Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.'
  }
];

export default function SpeakersPage() {
  return (
    <>
      <CategoryBanner title="SPEAKERS" />

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