import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import Attorneys from './components/Attorneys';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LegalAssistant from './components/LegalAssistant';
import CaseStudies from './components/CaseStudies';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
        
        <main className="flex-grow">
          <div id="home">
            <Hero scrollToContact={() => scrollToSection('contact')} />
          </div>
          
          <div id="practice-areas">
            <PracticeAreas />
          </div>

          <div id="case-studies">
            <CaseStudies />
          </div>
          
          <div id="attorneys">
            <Attorneys />
          </div>
          
          <div id="contact">
            <ContactForm />
          </div>
        </main>

        <Footer scrollToSection={scrollToSection} />
        
        {/* Floating AI Assistant */}
        <LegalAssistant />
      </div>
    </LanguageProvider>
  );
}
