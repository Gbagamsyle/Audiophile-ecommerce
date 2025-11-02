'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './YX1Feature.module.css';
import yx1Desktop from '../../assets/home/desktop/image-earphones-yx1.jpg';
import yx1Tablet from '../../assets/home/tablet/image-earphones-yx1.jpg';
import yx1Mobile from '../../assets/home/mobile/image-earphones-yx1.jpg';

const YX1Feature = () => {
  return (
    <section className={styles.yx1Feature}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <picture>
            <source media="(min-width: 769px)" srcSet={yx1Desktop.src} />
            <source media="(min-width: 376px)" srcSet={yx1Tablet.src} />
            <source media="(max-width: 375px)" srcSet={yx1Mobile.src} />
            <Image
              src={yx1Desktop}
              alt="YX1 Earphones"
              fill
              className={styles.image}
              priority
            />
          </picture>
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>YX1 EARPHONES</h2>
          <Link href="/earphones/yx1" className={styles.button}>
            SEE PRODUCT
          </Link>
        </div>
      </div>
    </section>
  );
};

export default YX1Feature;
