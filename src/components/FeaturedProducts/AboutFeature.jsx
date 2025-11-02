'use client';
import Image from 'next/image';
import styles from './AboutFeature.module.css';
import aboutImage from '../../assets/shared/desktop/image-best-gear.jpg';

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
            <source media="(min-width:769px)" srcSet={aboutImage.src} />
            <source media="(min-width:376px)" srcSet={aboutImage.src} />
            <source media="(max-width:375px)" srcSet={aboutImage.src} />
            <Image src={aboutImage} alt="Person listening to headphones" fill className={styles.image} priority />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default AboutFeature;
