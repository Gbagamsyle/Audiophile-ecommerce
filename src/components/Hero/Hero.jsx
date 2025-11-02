'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import heroImage from '../../assets/home/desktop/image-hero.jpg';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src={heroImage}
          alt="XX99 Mark II Headphones"
          priority
          fill
          className={styles.heroImage}
          sizes="100vw"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.overline}>NEW PRODUCT</p>
          <h1 className={styles.title}>XX99 Mark II Headphones</h1>
          <p className={styles.description}>
            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
          </p>
          <Link href="/product/xx99-mark-two-headphones" className={styles.button}>SEE PRODUCT</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;