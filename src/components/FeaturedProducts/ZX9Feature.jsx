'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ZX9Feature.module.css';
import speakerImage from '../../assets/home/desktop/image-speaker-zx9.png';
import patternCircles from '../../assets/home/desktop/pattern-circles.svg';

const ZX9Feature = () => {
  return (
    <section className={styles.zx9Feature}>
      <div className={styles.container}>
        <div className={styles.patternContainer}>
          <Image
            src={patternCircles}
            alt=""
            className={styles.pattern}
            width={944}
            height={944}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src={speakerImage}
              alt="ZX9 Speaker"
              className={styles.speakerImage}
              width={380}
              height={453}
              priority
            />
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>ZX9<br />SPEAKER</h2>
            <p className={styles.description}>
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
            </p>
            <Link href="/speakers/zx9" className={styles.button}>
              SEE PRODUCT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZX9Feature;