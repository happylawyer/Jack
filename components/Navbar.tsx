import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: { en: 'Home', zh: '首页' }, id: 'home' },
  { label: { en: 'Practice Areas', zh: '业务领域' }, id: 'practice-areas' },
  { label: { en: 'Success Stories', zh: '成功案例' }, id: 'case-studies' },
  { label: { en: 'Attorneys', zh: '律师团队' }, id: 'attorneys' },
  { label: { en: 'Contact', zh: '联系我们' }, id: 'contact' },
];

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy-900 shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => scrollToSection('home')}
        >
          <div className="w-10 h-10 bg-gold-500 rounded-sm flex items-center justify-center mr-3">
            <span className="text-navy-900 font-serif font-bold text-2xl">V</span>
          </div>
          <div className={`font-serif font-bold text-2xl tracking-wide ${isScrolled || activeSection !== 'home' ? 'text-white' : 'text-white'}`}>
            VERITAS <span className="text-gold-500">&</span> ASSOCIATES
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm uppercase tracking-widest font-semibold transition-colors duration-200 hover:text-gold-500 ${
                isScrolled ? 'text-gray-200' : 'text-white'
              }`}
            >
              {item.label[language]}
            </button>
          ))}
          
          <div className="h-6 w-px bg-gray-500 mx-2"></div>

          <button 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="text-white font-bold hover:text-gold-500 transition-colors text-sm"
          >
            {language === 'en' ? 'CN' : 'EN'}
          </button>

          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gold-600 hover:bg-gold-500 text-white px-6 py-2 rounded transition-colors duration-200 text-sm uppercase tracking-widest font-bold"
          >
            {t('Consultation', '立即咨询')}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center space-x-4">
           <button 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="text-white font-bold hover:text-gold-500 transition-colors text-sm"
          >
            {language === 'en' ? 'CN' : 'EN'}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
             </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-navy-900 absolute top-full left-0 w-full py-4 px-6 shadow-xl border-t border-navy-800">
          <div className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-gray-200 hover:text-gold-500 text-sm uppercase tracking-widest font-semibold"
              >
                {item.label[language]}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
