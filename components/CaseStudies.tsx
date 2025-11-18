import React from 'react';
import { CaseStudy } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const CASES: CaseStudy[] = [
  {
    id: 1,
    title: { en: "International Merger Clearance", zh: "跨国并购获批" },
    category: { en: "Corporate Law", zh: "公司法" },
    background: {
      en: "A mid-sized tech firm faced regulatory gridlock attempting to acquire a European competitor.",
      zh: "一家中型科技公司在试图收购欧洲竞争对手时面临监管僵局。"
    },
    strategy: {
      en: "We implemented a multi-jurisdictional filing strategy and negotiated divestitures to satisfy antitrust concerns.",
      zh: "我们实施了多管辖区申报策略，并通过协商资产剥离来消除反垄断顾虑。"
    },
    result: {
      en: "Acquisition approved in 4 months with minimal asset loss, increasing client market share by 40%.",
      zh: "收购在4个月内获批，资产损失极小，客户市场份额增加40%。"
    }
  },
  {
    id: 2,
    title: { en: "Complex Asset Division", zh: "复杂资产分割" },
    category: { en: "Family Law", zh: "婚姻家庭法" },
    background: {
      en: "High-net-worth divorce involving offshore accounts, family trusts, and business valuations.",
      zh: "涉及离岸账户、家族信托和商业估值的高净值离婚案件。"
    },
    strategy: {
      en: "Collaborated with forensic accountants to trace hidden assets and argued for equitable distribution based on contribution.",
      zh: "与法务会计师合作追踪隐匿资产，并基于贡献主张公平分配。"
    },
    result: {
      en: "Client secured 60% of marital assets and full ownership of the primary residence.",
      zh: "客户获得了60%的婚姻资产及主要住所的完全所有权。"
    }
  },
  {
    id: 3,
    title: { en: "Felony Charges Dismissed", zh: "重罪指控撤销" },
    category: { en: "Criminal Defense", zh: "刑事辩护" },
    background: {
      en: "Client wrongly accused of white-collar fraud due to accounting errors by a subordinate.",
      zh: "客户因下属的会计失误而被错误指控犯有白领欺诈罪。"
    },
    strategy: {
      en: "Detailed audit trail reconstruction and aggressive motion practice to suppress illegally obtained evidence.",
      zh: "重建详细的审计线索，并采取积极的动议策略以排除非法获得的证据。"
    },
    result: {
      en: "All charges dismissed prior to trial; client's professional reputation fully restored.",
      zh: "所有指控在审判前被撤销；客户的职业声誉得以完全恢复。"
    }
  }
];

const CaseStudies: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-gold-600 uppercase tracking-widest font-bold text-sm mb-2">{t('Proven Results', '卓越业绩')}</h3>
          <h2 className="text-4xl font-serif font-bold text-navy-900 mb-4">{t('Success Stories', '成功案例')}</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASES.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-gold-500">
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block bg-navy-50 text-navy-900 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                    {item.category[language]}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-navy-900 mb-6">{item.title[language]}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gold-600 font-bold text-sm uppercase tracking-wide mb-1">{t('Background', '案件背景')}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.background[language]}</p>
                  </div>
                  <div>
                    <h4 className="text-gold-600 font-bold text-sm uppercase tracking-wide mb-1">{t('Strategy', '律师策略')}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.strategy[language]}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <h4 className="text-green-700 font-bold text-sm uppercase tracking-wide mb-1">{t('Result', '最终结果')}</h4>
                    <p className="text-gray-700 text-sm font-medium leading-relaxed">{item.result[language]}</p>
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

export default CaseStudies;
