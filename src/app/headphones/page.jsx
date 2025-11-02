'use client';
import CategoryBanner from '@/components/Categories/CategoryBanner';
import Categories from '@/components/Categories/Categories';
import AboutFeature from '@/components/FeaturedProducts/AboutFeature';
import Image from 'next/image';
import Link from 'next/link';
import styles from './headphones.module.css';

import xx99Desktop from '../../assets/shared/desktop/image-xx99-mark-two-headphones.jpg';
import xx99MarkOne from '../../assets/shared/desktop/image-xx99-mark-one-headphones.jpg';
import xx59 from '../../assets/shared/desktop/image-xx59-headphones.jpg';

const products = [
  {
    slug: 'xx99-mark-two-headphones',
    name: 'XX99 Mark II Headphones',
    image: xx99Desktop,
    new: true,
    description: 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience.'
  },
    {
    slug: 'xx59-headphones',
    name: 'XX59 Headphones',
    image: xx59,
    new: false,
    description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones.'
  },
  {
    slug: 'xx99-mark-one-headphones',
    name: 'XX99 Mark I Headphones',
    image: xx99MarkOne,
    new: false,
    description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction.'
  }
];

export default function HeadphonesPage() {
  return (
    <>
      <CategoryBanner title="Headphones" />

      <section className={styles.productsList}>
        {products.map((product, index) => (
          <div
            key={product.slug}
            className={`${styles.product} ${index % 2 === 1 ? styles.reverse : ''}`}
          >
            <div className={styles.product__image}>
              <Image src={product.image} alt={product.name} />
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
