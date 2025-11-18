import React from 'react';
import { Attorney } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const TEAM: Attorney[] = [
  {
    id: 1,
    name: { en: "Eleanor Sterling", zh: "埃莉诺·斯特林" },
    title: { en: "Managing Partner", zh: "管理合伙人" },
    specialty: { en: "Corporate Law", zh: "公司法" },
    image: "https://picsum.photos/400/500?random=1",
    yearsExperience: 25,
    education: { en: "J.D., Harvard Law School", zh: "哈佛法学院 法学博士" },
    honors: {
      en: ["Best Lawyers 2023", "Top 100 Corporate Counsel"],
      zh: ["2023年度最佳律师", "百强企业法律顾问"]
    },
    bio: { 
      en: "With over 25 years of experience, Eleanor leads the firm's corporate division with a focus on international mergers.",
      zh: "埃莉诺拥有超过25年的经验，领导公司的企业部门，专注于国际并购业务。"
    }
  },
  {
    id: 2,
    name: { en: "Jameson Ford", zh: "詹姆森·福特" },
    title: { en: "Senior Partner", zh: "高级合伙人" },
    specialty: { en: "Criminal Defense", zh: "刑事辩护" },
    image: "https://picsum.photos/400/500?random=2",
    yearsExperience: 18,
    education: { en: "J.D., Yale Law School", zh: "耶鲁法学院 法学博士" },
    honors: {
      en: ["Former State Prosecutor", "Top Defense Attorney 2022"],
      zh: ["前州检察官", "2022年度最佳辩护律师"]
    },
    bio: { 
      en: "A former prosecutor, Jameson brings unique insight to criminal defense, aggressively protecting client rights.",
      zh: "作为前检察官，詹姆森为刑事辩护带来了独特的视角，积极维护客户的合法权益。"
    }
  },
  {
    id: 3,
    name: { en: "Sarah Chen", zh: "陈莎拉" },
    title: { en: "Associate Attorney", zh: "执业律师" },
    specialty: { en: "Family Law", zh: "婚姻家庭法" },
    image: "https://picsum.photos/400/500?random=3",
    yearsExperience: 8,
    education: { en: "J.D., Columbia Law School", zh: "哥伦比亚法学院 法学博士" },
    honors: {
      en: ["Rising Star 2023", "Pro Bono Excellence Award"],
      zh: ["2023年度新星律师", "公益法律服务卓越奖"]
    },
    bio: { 
      en: "Sarah is known for her empathetic yet firm approach in complex custody and divorce proceedings.",
      zh: "莎拉在复杂的监护权和离婚诉讼中以其既富有同情心又坚定的方式而闻名。"
    }
  }
];

const Attorneys: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-navy-50 relative">
      <div className="container mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="mb-6 md:mb-0">
               <h3 className="text-gold-600 uppercase tracking-widest font-bold text-sm mb-2">{t('Our Team', '精英团队')}</h3>
               <h2 className="text-4xl font-serif font-bold text-navy-900">{t('Meet Our Attorneys', '认识我们的律师')}</h2>
            </div>
            <button className="text-navy-900 font-bold border-b-2 border-gold-500 pb-1 hover:text-gold-600 transition-colors">
              {t('View All Attorneys', '查看所有律师')} &rarr;
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TEAM.map((attorney) => (
               <div key={attorney.id} className="bg-white shadow-lg rounded-sm overflow-hidden group flex flex-col">
                  <div className="relative overflow-hidden h-80">
                     <img 
                        src={attorney.image} 
                        alt={attorney.name[language]} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <p className="text-white text-sm leading-relaxed mb-2">{attorney.bio[language]}</p>
                     </div>
                  </div>
                  <div className="p-6 border-t-4 border-gold-500 flex-grow">
                     <h4 className="text-xl font-serif font-bold text-navy-900">{attorney.name[language]}</h4>
                     <p className="text-gold-600 font-bold text-xs uppercase tracking-widest mb-3">{attorney.title[language]}</p>
                     
                     <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start">
                          <span className="font-bold w-24 flex-shrink-0">{t('Specialty:', '擅长领域:')}</span>
                          <span>{attorney.specialty[language]}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-bold w-24 flex-shrink-0">{t('Education:', '教育背景:')}</span>
                          <span>{attorney.education[language]}</span>
                        </div>
                        <div className="flex items-start">
                           <span className="font-bold w-24 flex-shrink-0">{t('Experience:', '执业年限:')}</span>
                           <span>{attorney.yearsExperience} {t('Years', '年')}</span>
                        </div>
                     </div>

                     <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-bold text-navy-800 mb-1">{t('Honors:', '获得荣誉:')}</p>
                        <div className="flex flex-wrap gap-2">
                           {attorney.honors[language].map((honor, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                 {honor}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default Attorneys;
