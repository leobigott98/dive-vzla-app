import Hero from '@/app/components/home/hero';
import Navbar from '@/app/components/home/navbar';
import DiscountBanner from '@/app/components/home/discount-banner';
import Locations from '@/app/components/home/locations';
import Sponsors from '@/app/components/home/sponsors';
import Testimonials from '@/app/components/home/testimonials';
import Footer from '@/app/components/home/footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Navbar />
      <DiscountBanner />
      <Locations />
      <Sponsors />
      <Testimonials />
      <Footer />
    </main>
  );
}
