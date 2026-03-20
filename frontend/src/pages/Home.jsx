import HeroSection from '../components/home/HeroSection';
import FeaturedCollections from '../components/home/FeaturedCollections';
import CategoryTiles from '../components/home/CategoryTiles';
import TrustBadges from '../components/home/TrustBadges';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <CategoryTiles />
      <TrustBadges />
      <Testimonials />
      <Newsletter />
    </>
  );
}
