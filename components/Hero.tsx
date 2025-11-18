import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  scrollToContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToContact }) => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="Law Office" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900 opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-block mb-4 px-3 py-1 border border-gold-500 text-gold-500 uppercase tracking-[0.2em] text-xs font-bold">
          {t('Est. 1998', '始于 1998 年')}
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
          {t('Justice, Integrity,', '正义，诚信，')} <br />
          <span className="text-gold-500">{t('Excellence.', '卓越。')}</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          {t(
            'Veritas & Associates provides unwavering legal representation with a commitment to ethical practice and superior results. We stand by your side when it matters most.',
            'Veritas & Associates 致力于提供坚定不移的法律代理，恪守职业道德并追求卓越成果。在您最需要的时刻，我们与您并肩作战。'
          )}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={scrollToContact}
            className="bg-gold-600 hover:bg-gold-500 text-white font-bold py-4 px-8 rounded shadow-lg transition transform hover:-translate-y-1 uppercase tracking-widest text-sm"
          >
            {t('Request Consultation', '预约咨询')}
          </button>
          <button 
            onClick={() => document.getElementById('practice-areas')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent border border-white hover:bg-white hover:text-navy-900 text-white font-bold py-4 px-8 rounded shadow-lg transition transform hover:-translate-y-1 uppercase tracking-widest text-sm"
          >
            {t('Explore Our Services', '浏览服务项目')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
