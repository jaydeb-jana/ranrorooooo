import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandingClient from './LandingClient';

export const metadata = {
  title: 'Rankaro - Collect Better, Authentic Google Reviews with Ease',
  description:
    'Help your happy customers leave detailed, genuine Google reviews in seconds. Generate scannable QR codes and guided review drafts for your business.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <LandingClient />
      <Footer />
    </div>
  );
}
