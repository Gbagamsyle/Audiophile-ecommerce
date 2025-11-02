'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CartDrawer from '../CartDrawer';
import styles from './Navbar.module.css';
import hamburgerIcon from '../../assets/shared/tablet/icon-hamburger.svg';
import logo from '../../assets/shared/desktop/logo.svg';
import cartIcon from '../../assets/shared/desktop/icon-cart.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setIsCartOpen(true);
    window.addEventListener('cart:open', openHandler);
    return () => window.removeEventListener('cart:open', openHandler);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.navbarBorder}>
        <nav className={styles.navbar}>
          {/* Mobile Menu Button */}
          <button 
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Image
              src={hamburgerIcon}
              alt=""
              width={16}
              height={15}
            />
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src={logo}
              alt="audiophile"
              width={143}
              height={25}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.navLink}>HOME</Link>
            <Link href="/headphones" className={styles.navLink}>HEADPHONES</Link>
            <Link href="/speakers" className={styles.navLink}>SPEAKERS</Link>
            <Link href="/earphones" className={styles.navLink}>EARPHONES</Link>
          </nav>

          {/* Cart Button */}
          <button className={styles.cartButton} aria-label="Open cart" onClick={() => setIsCartOpen(true)}>
            <Image
              src={cartIcon}
              alt=""
              width={23}
              height={20}
            />
          </button>

          {/* Cart Drawer Modal */}
          <CartDrawer userId="demo-user" open={isCartOpen} onClose={() => setIsCartOpen(false)} />

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={styles.mobileMenu}>
              {/* Mobile menu content will go here */}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;