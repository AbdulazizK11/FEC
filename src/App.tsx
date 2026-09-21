import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustAccreditations from './components/TrustAccreditations';
import AboutAndLeadership from './components/AboutAndLeadership';
import OurAchievements from './components/OurAchievements';
import ServicesAndPackages from './components/ServicesAndPackages';
import CostEstimator from './components/CostEstimator';
import PortfolioGallery from './components/PortfolioGallery';
import WorkflowTimeline from './components/WorkflowTimeline';
import ContactAndLocation from './components/ContactAndLocation';
import Footer from './components/Footer';
import StickyActionBar from './components/StickyActionBar';

function MainLayout() {
  const { direction, isAr } = useLanguage();
  const [selectedPackageForEstimator, setSelectedPackageForEstimator] = useState<
    'economic' | 'premium' | 'comprehensive'
  >('premium');

  const handleSelectPackageForEstimator = (packageId: 'economic' | 'premium' | 'comprehensive') => {
    setSelectedPackageForEstimator(packageId);
    const elem = document.getElementById('estimator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      dir={direction}
      className={`min-h-screen bg-[#F5F4F0] text-[#000000] selection:bg-[#F4E95B] selection:text-[#000000] antialiased ${
        isAr ? 'font-thmanyah-text' : 'font-sans'
      }`}
    >
      {/* Top Header */}
      <Header />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => handleScrollToSection('packages')}
          onEstimateClick={() => handleScrollToSection('estimator')}
        />

        {/* 2. Trust Accreditations & Saudi Licenses */}
        <TrustAccreditations />

        {/* 3. About Us & Board of Experts / Leadership */}
        <AboutAndLeadership />

        {/* 4. Our Achievements & Animated Social Proof Counters */}
        <OurAchievements
          onOpenEstimator={() => handleScrollToSection('estimator')}
        />

        {/* 5. Services & 3-Tier Packages */}
        <ServicesAndPackages
          onSelectPackageForEstimator={handleSelectPackageForEstimator}
        />

        {/* 6. Interactive Cost & Area Estimator Tool */}
        <CostEstimator
          initialPackage={selectedPackageForEstimator}
        />

        {/* 7. Portfolio & Projects Gallery */}
        <PortfolioGallery />

        {/* 8. Workflow Timeline & FAQs */}
        <WorkflowTimeline />

        {/* 9. Contact & Location (Ar Rass, Al Qassim) */}
        <ContactAndLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile/Desktop Quick Action Bar & WhatsApp */}
      <StickyActionBar
        onOpenEstimator={() => handleScrollToSection('estimator')}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}

