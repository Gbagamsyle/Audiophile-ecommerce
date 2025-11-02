'use client';
import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import Image from 'next/image';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';
import Categories from '@/components/Categories/Categories';
import AboutFeature from '@/components/FeaturedProducts/AboutFeature';
import styles from '../[slug]/product.module.css';

// Import product images
import productImage from '../../../assets/product-yx1-earphones/desktop/image-product.jpg';
import gallery1 from '../../../assets/product-yx1-earphones/desktop/image-gallery-1.jpg';
import gallery2 from '../../../assets/product-yx1-earphones/desktop/image-gallery-2.jpg';
import gallery3 from '../../../assets/product-yx1-earphones/desktop/image-gallery-3.jpg';

// Import related product images
import related1Image from '../../../assets/shared/desktop/image-xx99-mark-one-headphones.jpg';
import related2Image from '../../../assets/shared/desktop/image-xx59-headphones.jpg';
import related3Image from '../../../assets/shared/desktop/image-zx9-speaker.jpg';

// Product data
const product = {
  new: true,
  name: "YX1 Wireless Earphones",
  description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
  price: 599,
  features: `Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 20-hour battery life includes a convenient wireless charging case for on-the-go charging.`,
  includes: [
    { quantity: 2, item: "Earphone unit" },
    { quantity: 6, item: "Multi-size earplugs" },
    { quantity: 1, item: "User manual" },
    { quantity: 1, item: "USB-C charging cable" },
    { quantity: 1, item: "Travel pouch" }
  ],
  others: [
    {
      name: "XX99 Mark I",
      slug: "xx99-mark-one-headphones",
      image: related1Image
    },
    {
      name: "XX59",
      slug: "xx59-headphones",
      image: related2Image
    },
    {
      name: "ZX9 Speaker",
      slug: "zx9-speaker",
      image: related3Image
    }
  ]
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const userId = 'demo-user'; // TODO: Replace with real user id
  
  const addItemToCart = useMutation(api.cart.addItemToCart);
  const createCart = useMutation(api.cart.createCart);
  const cart = useQuery(api.cart.getCart, { userId });

  const handleAddToCart = async () => {
    try {
      // If no cart exists, create one
      if (!cart) {
        await createCart({ userId });
      }

      // Add item to cart
      await addItemToCart({
        userId,
        item: {
          id: 'yx1-earphones',
          name: product.name,
          price: product.price,
          quantity: quantity,
          imageUrl: productImage.src,
        },
      });

      console.log('Added to cart successfully!');
      // Open cart drawer after adding
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('cart:open'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <main className={styles.product}>
      <div className={styles.container}>
        <Link href="/earphones" className={styles.goBack}>Go Back</Link>

        {/* Product Main Section */}
        <section className={styles.productMain}>
          <div className={styles.productImage}>
            <Image 
              src={productImage}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className={styles.productContent}>
            {product.new && <p className={styles.new}>NEW PRODUCT</p>}
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>$ {product.price.toLocaleString()}</p>

            <div className={styles.controls}>
              <div className={styles.quantity}>
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button className={styles.btnPrimary} onClick={handleAddToCart}>ADD TO CART</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.featuresContent}>
            <h2>FEATURES</h2>
            <p className={styles.featuresText}>{product.features}</p>
          </div>

          <div className={styles.inTheBox}>
            <h2>IN THE BOX</h2>
            <ul>
              {product.includes.map((item, index) => (
                <li key={index}>
                  <span className={styles.quantity}>{item.quantity}x</span>
                  <span className={styles.item}>{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gallery Section */}
        <section className={styles.gallery}>
          <div className={styles.galleryLeft}>
            <div className={styles.galleryImage}>
              <Image 
                src={gallery1}
                alt="Gallery 1"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className={styles.galleryImage}>
              <Image 
                src={gallery2}
                alt="Gallery 2"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className={styles.galleryRight}>
            <div className={styles.galleryImage}>
              <Image 
                src={gallery3}
                alt="Gallery 3"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </div>
        </section>

        {/* You May Also Like Section */}
        <section className={styles.others}>
          <h2>YOU MAY ALSO LIKE</h2>
          <div className={styles.otherProducts}>
            {product.others.map((item, index) => (
              <div key={index} className={styles.otherProduct}>
                <div className={styles.otherImage}>
                  <Image 
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className={styles.otherName}>{item.name}</h3>
                <Link href={`/product/${item.slug}`} className={styles.btnPrimary}>
                  SEE PRODUCT
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Categories and About Sections */}
        <Categories />
        <AboutFeature />
      </div>
    </main>
  );
}
