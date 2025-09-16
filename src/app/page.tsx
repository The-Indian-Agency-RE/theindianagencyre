import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OurStory from '@/components/Story';
import Footer from '@/components/Footer';
import FeaturedProperties from '@/components/FeaturedProperties';
import InstagramSection from '@/components/InstagramSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurStory />
      <FeaturedProperties />
      <InstagramSection />
      <Footer />
    </>
  );
}
