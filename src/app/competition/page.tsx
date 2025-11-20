import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import CompetitionSection from '@/components/CompetitionSection';

export default function CompetitionPage() {
  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      
      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20"></div>
      
      <CompetitionSection />
      
      <Footer />
    </div>
  );
}
