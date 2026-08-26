import HeroSection from "../components/home/HeroSection";
import BenefitsStrip from "../components/home/BenefitsStrip";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import DealSection from "../components/home/DealSection";
import TrendingSection from "../components/home/TrendingSection";
import PromoBanner from "../components/home/PromoBanner";

const Home = () => {
  return (
    <>
      <HeroSection />

      <BenefitsStrip />

      <CategorySection />

      <FeaturedProducts />

      <DealSection />

      <TrendingSection />

      <PromoBanner />
    </>
  );
};

export default Home;