'use client';
import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import Categories from '@/components/Categories/Categories';
import AboutFeature from '@/components/FeaturedProducts/AboutFeature';
import styles from '../[slug]/product.module.css';
// Convex mutation name (adjust path if needed)
import { api } from '../../../../convex/_generated/api';
// Import product images
import productImage from '../../../assets/product-xx99-mark-two-headphones/desktop/image-product.jpg';
import gallery1 from '../../../assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg';
import gallery2 from '../../../assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg';
import gallery3 from '../../../assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg';

// Import related product images
import related1Image from '../../../assets/shared/desktop/image-xx99-mark-one-headphones.jpg';
import related2Image from '../../../assets/shared/desktop/image-xx59-headphones.jpg';
import related3Image from '../../../assets/shared/desktop/image-zx9-speaker.jpg';

// Product data
const product = {
  new: true,
  name: "XX99 Mark II Headphones",
  description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
  price: 2999,
  features: `Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you're taking a business call or just in your own personal space, the auto on/off and pause features ensure that you'll never miss a beat.\n\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.`,
  includes: [
    { quantity: 1, item: "Headphone unit" },
    { quantity: 2, item: "Replacement earcups" },
    { quantity: 1, item: "User manual" },
    { quantity: 1, item: "3.5mm 5m audio cable" },
    { quantity: 1, item: "Travel bag" }
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

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handler for add to cart
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
          id: 'xx99-mark-two-headphones',
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

  return (
    <main className={styles.product}>
      <div className={styles.container}>
        <Link href="/headphones" className={styles.goBack}>Go Back</Link>

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
