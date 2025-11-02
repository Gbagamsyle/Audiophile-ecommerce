'use client';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import ZX9Feature from '../components/FeaturedProducts/ZX9Feature';
import ZX7Feature from '../components/FeaturedProducts/ZX7Feature';
import YX1Feature from '../components/FeaturedProducts/YX1Feature';
import AboutFeature from '../components/FeaturedProducts/AboutFeature';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
    <ZX9Feature />
    <ZX7Feature />
    <YX1Feature />
    <AboutFeature />
    {/* Other sections will be added here */}
    </main>
  );
}
