'use client';
import Image from 'next/image';
import styles from './AboutFeature.module.css';
import mobileImg from '../../assets/shared/mobile/image-best-gear.jpg';
import tabletImg from '../../assets/shared/tablet/image-best-gear.jpg';
import desktopImg from '../../assets/shared/desktop/image-best-gear.jpg';

const AboutFeature = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h2 className={styles.title}>
            <span className={styles.line}>
              Bringing you the <span className={styles.highlight}>best</span>
            </span>
            <span className={styles.line}>audio gear</span>
          </h2>
          <p className={styles.description}>
            Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to see, touch, and listen to real music.
          </p>
        </div>
<div className={styles.imageWrap}>
  <picture>
    <source media="(min-width: 1110px)" srcSet={desktopImg.src} />
    <source media="(min-width: 769px)" srcSet={tabletImg.src} />
    <img
      src={mobileImg.src}
      alt="Person listening to headphones"
      className={styles.image}
    />
  </picture>
</div>

      </div>
    </section>
  );
};

export default AboutFeature;
