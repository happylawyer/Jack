import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactForm: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gold-500 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <div className="lg:w-5/12">
            <h3 className="text-gold-500 uppercase tracking-widest font-bold text-sm mb-2">{t('Contact Us', '联系我们')}</h3>
            <h2 className="text-4xl font-serif font-bold mb-6">{t('Let Us Fight For You', '让我们为您而战')}</h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              {t(
                'Choosing the right legal representation is critical. Contact us today for a confidential consultation to discuss your legal needs.',
                '选择正确的法律代理至关重要。请立即联系我们进行保密咨询，讨论您的法律需求。'
              )}
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-navy-800 p-3 rounded text-gold-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">{t('Headquarters', '总部地址')}</h4>
                  <p className="text-gray-400 text-sm">100 Legal Avenue, Suite 500<br/>New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-navy-800 p-3 rounded text-gold-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">{t('Phone', '联系电话')}</h4>
                  <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                  <p className="text-gray-500 text-xs mt-1">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-7/12 bg-white rounded-lg p-8 md:p-12 text-gray-800">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-navy-900 mb-2">{t('Request Received', '请求已收到')}</h3>
                 <p className="text-gray-600">{t('Thank you. A member of our team will contact you within 24 hours.', '谢谢。我们的团队成员将在24小时内与您联系。')}</p>
                 <button onClick={() => setFormStatus('idle')} className="mt-6 text-gold-600 font-bold hover:underline">{t('Send another message', '发送另一条信息')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">{t('Case Evaluation', '案件评估')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('First Name', '名字')}</label>
                    <input required type="text" className="w-full border-b-2 border-gray-200 focus:border-gold-500 outline-none py-2 transition-colors bg-transparent" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('Last Name', '姓氏')}</label>
                    <input required type="text" className="w-full border-b-2 border-gray-200 focus:border-gold-500 outline-none py-2 transition-colors bg-transparent" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('Email Address', '电子邮箱')}</label>
                    <input required type="email" className="w-full border-b-2 border-gray-200 focus:border-gold-500 outline-none py-2 transition-colors bg-transparent" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('Phone Number', '电话号码')}</label>
                    <input required type="tel" className="w-full border-b-2 border-gray-200 focus:border-gold-500 outline-none py-2 transition-colors bg-transparent" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('Practice Area', '咨询领域')}</label>
                  <select className="w-full border-b-2 border-gray-200 focus:border-gold-500 outline-none py-2 transition-colors bg-transparent text-gray-600">
                    <option>{t('Corporate Law', '公司法')}</option>
                    <option>{t('Family Law', '婚姻家庭法')}</option>
                    <option>{t('Criminal Defense', '刑事辩护')}</option>
                    <option>{t('Estate Planning', '遗产规划')}</option>
                    <option>{t('Other', '其他')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('Case Details', '案件详情')}</label>
                  <textarea required rows={4} className="w-full border-2 border-gray-200 rounded focus:border-gold-500 outline-none p-3 transition-colors resize-none" placeholder={t('Briefly describe your legal matter...', '请简要描述您的法律事务...')}></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className={`w-full bg-navy-900 text-white font-bold py-4 rounded hover:bg-navy-800 transition-colors uppercase tracking-widest text-sm ${formStatus === 'submitting' ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {formStatus === 'submitting' ? t('Sending...', '发送中...') : t('Submit Request', '提交申请')}
                </button>
                
                <p className="text-xs text-gray-400 mt-4 text-center">
                  {t('By submitting this form, you agree to our privacy policy. No attorney-client relationship is formed by submitting this form.', '提交此表格即表示您同意我们的隐私政策。提交此表格不构成律师-客户关系。')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
