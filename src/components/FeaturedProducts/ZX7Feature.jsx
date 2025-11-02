'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ZX7Feature.module.css';
import zx7Desktop from '../../assets/home/desktop/image-speaker-zx7.jpg';
import zx7Tablet from '../../assets/home/tablet/image-speaker-zx7.jpg';
import zx7Mobile from '../../assets/home/mobile/image-speaker-zx7.jpg';

const ZX7Feature = () => {
  return (
    <section className={styles.zx7Feature}>
      <div className={styles.container}>
        <picture>
          <source media="(min-width: 769px)" srcSet={zx7Desktop.src} />
          <source media="(min-width: 376px)" srcSet={zx7Tablet.src} />
          <source media="(max-width: 375px)" srcSet={zx7Mobile.src} />
          <Image
            src={zx7Desktop}
            alt="ZX7 Speaker"
            fill
            className={styles.backgroundImage}
            priority
          />
        </picture>
        <div className={styles.content}>
          <h2 className={styles.title}>ZX7 SPEAKER</h2>
          <Link href="/speakers/zx7" className={styles.button}>
            SEE PRODUCT
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ZX7Feature;