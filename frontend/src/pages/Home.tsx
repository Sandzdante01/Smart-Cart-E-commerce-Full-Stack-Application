import React from 'react';
import { Hero } from '../components/home/Hero';
import { PromoBanner } from '../components/home/PromoBanner';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { FlashSale } from '../components/home/FlashSale';
import { WhySmartCart } from '../components/home/WhySmartCart';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';

export function Home() {
  return (
    <>
      <Hero />
      <PromoBanner />
      <CategorySection />
      <FeaturedProducts />
      <FlashSale />
      <WhySmartCart />
      <Testimonials />
      <Newsletter />
    </>);

}