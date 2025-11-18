import React from 'react';
import { PracticeArea } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const AREAS: PracticeArea[] = [
  {
    id: 1,
    title: { en: "Corporate Law", zh: "公司法" },
    description: { 
      en: "Navigating complex business landscapes with strategic legal counsel for mergers, acquisitions, and regulatory compliance.",
      zh: "为企业并购、收购及监管合规提供战略性法律咨询，助您驾驭复杂的商业环境。"
    },
    icon: (
      <svg className="w-12 h-12 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 2,
    title: { en: "Family Law", zh: "婚姻家庭法" },
    description: { 
      en: "Compassionate representation for divorce, child custody, and adoption matters, focused on protecting your family's future.",
      zh: "在离婚、子女抚养权及收养事务中提供富有同情心的代理服务，致力于守护您家庭的未来。"
    },
    icon: (
      <svg className="w-12 h-12 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: { en: "Criminal Defense", zh: "刑事辩护" },
    description: { 
      en: "Aggressive defense strategies for DUI, white-collar crimes, and felony charges. Preserving your rights and freedom.",
      zh: "针对酒驾、白领犯罪及重罪指控提供积极的辩护策略，全力维护您的权利与自由。"
    },
    icon: (
      <svg className="w-12 h-12 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  {
    id: 4,
    title: { en: "Estate Planning", zh: "遗产规划" },
    description: { 
      en: "Comprehensive wealth preservation strategies, including wills, trusts, and probate administration for peace of mind.",
      zh: "提供包括遗嘱、信托及遗嘱认证在内的全面财富保全策略，让您无后顾之忧。"
    },
    icon: (
      <svg className="w-12 h-12 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

const PracticeAreas: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-gold-600 uppercase tracking-widest font-bold text-sm mb-2">{t('Our Expertise', '专业领域')}</h3>
          <h2 className="text-4xl font-serif font-bold text-navy-900 mb-4">{t('Practice Areas', '法律服务')}</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AREAS.map((area) => (
            <div key={area.id} className="group bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-gold-500 hover:shadow-xl transition-all duration-300 cursor-default">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {area.icon}
              </div>
              <h4 className="text-xl font-serif font-bold text-navy-900 mb-4">{area.title[language]}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {area.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
