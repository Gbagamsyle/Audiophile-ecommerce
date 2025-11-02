'use client';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/footer.css';
import logo from '../assets/shared/desktop/logo.svg';
import facebookIcon from '../assets/shared/desktop/icon-facebook.svg';
import twitterIcon from '../assets/shared/desktop/icon-twitter.svg';
import instagramIcon from '../assets/shared/desktop/icon-instagram.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
      <div className="top">
  <div className="leftSide">
    <div className="bar"></div>
    <Image src={logo} alt="Audiophile Logo" width={143} height={25}/>
  </div>

  <nav className="nav">
    <Link href="/" className="link">HOME</Link>
    <Link href="/headphones" className="link">HEADPHONES</Link>
    <Link href="/speakers" className="link">SPEAKERS</Link>
    <Link href="/earphones" className="link">EARPHONES</Link>
  </nav>
</div>

        <div className="bottom">
          <p className="description">
            Audiophile is an all-in-one stop to fulfill your audio needs. 
            We’re a small team of music lovers and sound specialists who are devoted 
            to helping you get the most out of personal audio. Come and visit our 
            demo facility - we’re open 7 days a week.
          </p>

          <div className="footerBottom">
            <p className="copy">Copyright 2021. All Rights Reserved</p>
            <div className="socials">
              <Link href="#" aria-label="Facebook">
                <Image src={facebookIcon} alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Image src={twitterIcon} alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Image src={instagramIcon} alt="Instagram" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
