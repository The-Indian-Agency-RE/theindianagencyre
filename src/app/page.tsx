import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OurStory from '@/components/Story';
import Footer from '@/components/Footer';
import FeaturedProperties from '@/components/FeaturedProperties';
import InstagramSection from '@/components/InstagramSection';
import { ServerApiClient } from '@/lib/apiClient';

interface Property {
  _id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  image?: string;
}

export default async function Home() {
  // Fetch featured properties on the server side
  let featuredProperties: Property[] = [];
  
  try {
    const allProperties = await ServerApiClient.getProperties();
    featuredProperties = allProperties.slice(0, 3); // Get first 3 properties as featured
  } catch (error) {
    console.error('Failed to fetch featured properties:', error);
    // Fallback to empty array, component will handle this gracefully
  }

  return (
    <>
      <Navbar />
      <Hero />
      <OurStory />
      <FeaturedProperties initialProperties={featuredProperties} />
      <InstagramSection />
      <Footer />
    </>
  );
}
