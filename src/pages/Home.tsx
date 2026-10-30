import React from 'react';
import Hero from '../components/sections/Hero';
import StartHereSection from '../components/sections/StartHereSection';
import ServicesSection from '../components/home/ServicesSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import ContactSection from '../components/home/ContactSection';
import SEO from '../components/SEO';

const Home: React.FC = () => (
  <>
    <SEO
      title="BetterTrece.org | City of Trece Martires, Cavite"
      description="Community-run portal to find services, government information, barangay directory, and emergency hotlines for the City of Trece Martires, Cavite."
      keywords="Trece Martires City, Cavite, local government, city services, public services, BetterTrece"
    />
    <main className="flex-grow">
      <Hero />
      <StartHereSection />
      <ServicesSection title="Find city services" />
      <WeatherMapSection />
      <ContactSection />
    </main>
  </>
);

export default Home;
