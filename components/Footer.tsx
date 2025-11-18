import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
               <div className="w-8 h-8 bg-gold-500 rounded-sm flex items-center justify-center mr-3 text-navy-900 font-bold font-serif">V</div>
               <span className="font-serif font-bold text-xl tracking-wide">VERITAS</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t(
                'Providing exceptional legal counsel with integrity and dedication since 1998. We are committed to achieving the best possible outcome for every client.',
                '自1998年以来，我们一直以诚信和敬业精神提供卓越的法律咨询。我们致力于为每位客户争取最佳结果。'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-gold-500">{t('Quick Links', '快速链接')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">{t('Home', '首页')}</button></li>
              <li><button onClick={() => scrollToSection('practice-areas')} className="hover:text-white transition-colors">{t('Practice Areas', '业务领域')}</button></li>
              <li><button onClick={() => scrollToSection('attorneys')} className="hover:text-white transition-colors">{t('Attorneys', '律师团队')}</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">{t('Contact Us', '联系我们')}</button></li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-gold-500">{t('Legal Services', '法律服务')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{t('Corporate Litigation', '公司诉讼')}</li>
              <li>{t('Family Law & Divorce', '婚姻法与离婚')}</li>
              <li>{t('Criminal Defense', '刑事辩护')}</li>
              <li>{t('Estate Planning', '遗产规划')}</li>
              <li>{t('Real Estate Law', '房地产法')}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-gold-500">{t('Newsletter', '订阅资讯')}</h4>
            <p className="text-gray-500 text-sm mb-4">{t('Subscribe to stay updated on legal news and firm announcements.', '订阅以获取最新法律新闻和律所公告。')}</p>
            <form className="flex">
              <input type="email" placeholder={t('Email Address', '电子邮箱')} className="bg-gray-800 text-white px-4 py-2 rounded-l-sm focus:outline-none focus:bg-gray-700 w-full text-sm" />
              <button className="bg-gold-600 hover:bg-gold-500 text-white px-4 py-2 rounded-r-sm transition-colors">
                &rarr;
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Veritas & Associates. {t('All rights reserved.', '版权所有。')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-gray-400">{t('Privacy Policy', '隐私政策')}</a>
             <a href="#" className="hover:text-gray-400">{t('Terms of Service', '服务条款')}</a>
             <a href="#" className="hover:text-gray-400">{t('Attorney Advertising', '律师广告')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
