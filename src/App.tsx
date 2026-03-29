/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Gavel, 
  Search, 
  Landmark, 
  AlertTriangle, 
  MicOff, 
  ChevronsRight, 
  PiggyBank, 
  User, 
  MapPin, 
  ExternalLink, 
  FileText, 
  ClipboardCheck, 
  Archive, 
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Activity,
  Link as LinkIcon,
  RefreshCw,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Header = ({ onPortalLink }: { onPortalLink: () => void }) => (
  <header className="sticky top-0 z-50 w-full bg-[#f8f9fa] border-b border-[#00113a]/10 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-opacity-90">
    <div className="flex items-center gap-3">
      <Gavel className="text-[#00113a] w-6 h-6" />
      <h1 className="font-bold text-xl tracking-tight text-[#00113a]">不作為の公文書庫</h1>
    </div>
    <div className="flex items-center gap-2">
      <button 
        onClick={onPortalLink}
        className="flex items-center gap-1.5 bg-[#00113a]/5 hover:bg-[#00113a]/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-[#00113a] transition-colors border border-[#00113a]/10"
      >
        <Globe size={12} />
        Portal
      </button>
      <button className="p-2 hover:bg-[#00113a]/5 rounded-full transition-colors">
        <Search className="text-[#00113a] w-6 h-6" />
      </button>
    </div>
  </header>
);

// --- Views ---

const PortalView = ({ onEnterArchive, onPortalLink }: { onEnterArchive: () => void, onPortalLink: () => void }) => {
  const [url, setUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="space-y-10 pb-24"
    >
      {/* External Portal Connection */}
      <section className="px-4 pt-4">
        <div className="bg-[#00113a]/5 border border-[#00113a]/10 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Globe className="text-[#00113a]" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#4c616c] uppercase tracking-wider">Connected Portal</p>
              <p className="text-xs font-black text-[#00113a]">project-mana-final-release2.vercel.app</p>
            </div>
          </div>
          <button 
            onClick={handleSync}
            className={cn(
              "p-2 rounded-full transition-all",
              isSyncing ? "animate-spin text-[#00113a]" : "text-[#4c616c] hover:bg-white"
            )}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </section>

      {/* Hero Portal */}
      <section className="px-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#00113a]/5 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5 text-[#00113a]">
            <Gavel size={240} />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#00113a]/5 px-3 py-1 rounded-full">
              <Activity size={14} className="text-[#00113a]" />
              <span className="text-[10px] font-bold text-[#00113a] uppercase tracking-widest">System Online</span>
            </div>
            
            <h2 className="text-4xl font-black text-[#00113a] leading-tight tracking-tighter">
              隠された<br />
              不作為を<br />
              可視化する。
            </h2>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="HTML/URLをホットリンク..." 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-[#f3f4f5] border-none rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#00113a]/20"
                />
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4c616c]" size={18} />
              </div>
              
              <button 
                onClick={onEnterArchive}
                className="w-full bg-[#00113a] text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all group"
              >
                公文書庫へ入る
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 grid grid-cols-2 gap-4">
        <div className="bg-[#f3f4f5] p-5 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold text-[#4c616c] uppercase">Total Surplus</span>
          <p className="text-2xl font-black text-[#00113a]">1,430<span className="text-xs ml-1">億円</span></p>
        </div>
        <div className="bg-[#ba1a1a]/5 p-5 rounded-2xl space-y-2 border border-[#ba1a1a]/10">
          <span className="text-[10px] font-bold text-[#ba1a1a] uppercase">Active Alerts</span>
          <p className="text-2xl font-black text-[#ba1a1a]">3,412<span className="text-xs ml-1">件</span></p>
        </div>
      </section>

      {/* Featured Alert */}
      <section className="px-4">
        <div className="bg-[#ba1a1a] rounded-2xl p-6 text-white space-y-4 shadow-lg">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">緊急注目案件</span>
          </div>
          <h3 className="text-lg font-bold leading-tight">京都市：物価高騰対策予算 180億円の未執行問題</h3>
          <p className="text-xs opacity-80 leading-relaxed">
            市民の困窮をよそに、予算の40%が使われず「黒字」として処理されました。
          </p>
          <button 
            onClick={onEnterArchive}
            className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs font-bold transition-colors border border-white/20"
          >
            詳細をアーカイブで確認
          </button>
        </div>
      </section>
    </motion.div>
  );
};

const ArchiveView = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="space-y-12 pb-24"
  >
    <HeroSection />
    <ComparisonSection />
    <StatsGrid />
    <VisualizationSection />
    <section className="px-4 space-y-6">
      <h3 className="text-xl font-bold border-l-4 border-[#00113a] pl-3">最新の不作為アーカイブ</h3>
      <div className="space-y-6">
        <ArchiveCard 
          tag="支援拒否"
          date="2023.10.12"
          title="母子家庭への緊急支援金の不当な支給遅延と窓口対応の不作為"
          person="福祉部 窓口担当者"
          location="京都市中京区"
          description="「規定がない」として申請書を3ヶ月間放置。内部規定では即時対応が可能だったことが判明。"
        />
        <ArchiveCard 
          tag="公共管理"
          date="2023.10.05"
          title="老朽化した通学路のガードレール修繕依頼に対する2年間の放置"
          person="土木事務所"
          location="京都市右京区"
          description="住民からの度重なる危険性の指摘にもかかわらず「点検計画待ち」を理由に修繕を不作為。"
        />
      </div>
    </section>
    <Timeline />
  </motion.div>
);

// --- Sub-components for ArchiveView ---

const HeroSection = () => (
  <section className="px-4 pt-6">
    <div className="relative overflow-hidden rounded-2xl bg-[#00113a] text-white p-8 shadow-xl">
      <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
        <Landmark size={180} />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter mb-6">
          市民の不便で積み上げた<br />
          <span className="text-[#ffb3ac] underline decoration-4 underline-offset-8">黒字を暴く</span>
        </h2>
        <div className="space-y-6">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold opacity-80 uppercase tracking-widest">京都市 財政余剰金</span>
            <span className="text-4xl font-black">180<span className="text-xl ml-1">億円</span></span>
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-5 rounded-xl backdrop-blur-md border border-white/10">
            <AlertTriangle className="text-[#ba1a1a] w-8 h-8" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">裏にある不作為件数</p>
              <p className="text-3xl font-bold">1,248 <span className="text-sm font-normal opacity-70">案件</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ComparisonSection = () => {
  const cities = [
    { name: '大阪市 (Osaka)', surplus: 500, budget: 1800, ratio: '27.7%', width: '85%', color: 'bg-[#00113a]' },
    { name: '名古屋市 (Nagoya)', surplus: 400, budget: 1300, ratio: '30.7%', width: '95%', color: 'bg-[#00113a]/80' },
    { name: '横浜市 (Yokohama)', surplus: 350, budget: 2000, ratio: '17.5%', width: '55%', color: 'bg-[#00113a]/60' },
  ];

  return (
    <section className="px-4 space-y-4">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h3 className="text-xl font-bold border-l-4 border-[#00113a] pl-3">不作為蓄財比率</h3>
          <p className="text-[10px] text-[#4c616c] font-bold pl-4 uppercase tracking-wider">Surplus to Total Budget Ratio</p>
        </div>
        <span className="text-[10px] text-[#00113a] font-bold uppercase tracking-wider bg-[#00113a]/5 px-2 py-0.5 rounded">政令指定都市比較</span>
      </div>
      <div className="bg-[#f3f4f5] rounded-2xl p-6 space-y-8">
        <p className="text-sm text-[#444650] font-medium leading-relaxed">
          市全体の予算規模に対し、どれだけの余剰金が「使われずに」蓄積されているかを比率で比較。
        </p>
        <div className="space-y-8">
          {cities.map((city) => (
            <div key={city.name} className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold block">{city.name}</span>
                  <span className="text-[10px] text-[#4c616c] font-medium">総予算: {city.budget/10}兆円 / 余剰金: {city.surplus}億円</span>
                </div>
                <span className="text-lg font-black text-[#00113a]">{city.ratio}</span>
              </div>
              <div className="h-4 flex rounded-full overflow-hidden bg-[#e1e3e4] shadow-inner relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: city.width }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className={cn(city.color, "h-full rounded-full")}
                />
              </div>
            </div>
          ))}
          <div className="space-y-3 pt-4 border-t border-[#c5c6d2] border-dashed">
            <div className="flex justify-between items-end">
              <div className="space-y-0.5">
                <span className="text-sm font-bold block text-[#ba1a1a]">京都市 (Kyoto)</span>
                <span className="text-[10px] text-[#4c616c] font-medium">総予算: 0.9兆円 / 余剰金: 180億円</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#ba1a1a] block leading-none mb-1 uppercase tracking-tighter">Inaction Gap</span>
                <span className="text-2xl font-black text-[#ba1a1a] leading-none">+340%</span>
              </div>
            </div>
            <div className="h-6 flex rounded-full overflow-hidden bg-[#e1e3e4] shadow-inner relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '20%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="bg-[#00113a] h-full"
              />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
                className="bg-[#ba1a1a] h-full relative"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              >
                <div className="absolute inset-0 flex items-center justify-end px-4">
                  <span className="text-[10px] text-white font-black tracking-widest uppercase">Critical Discrepancy</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsGrid = () => (
  <section className="px-4 grid grid-cols-2 gap-4">
    <div className="bg-white p-6 rounded-2xl border-b-4 border-[#ba1a1a] shadow-sm">
      <p className="text-xs font-bold text-[#4c616c] mb-2">支援内容更新停止</p>
      <p className="text-4xl font-black text-[#00113a]">12<span className="text-lg ml-1">年</span></p>
      <span className="mt-3 text-[10px] font-bold text-[#ba1a1a] bg-[#ba1a1a]/10 py-1 px-3 rounded-full inline-block">深刻な停滞</span>
    </div>
    <div className="bg-white p-6 rounded-2xl border-b-4 border-[#00113a] shadow-sm">
      <p className="text-xs font-bold text-[#4c616c] mb-2">行政システム乖離率</p>
      <p className="text-4xl font-black text-[#00113a]">82<span className="text-lg ml-1">%</span></p>
      <span className="mt-3 text-[10px] font-bold text-[#4c616c] bg-[#4c616c]/10 py-1 px-3 rounded-full inline-block">要再設計</span>
    </div>
  </section>
);

const VisualizationSection = () => (
  <section className="px-4">
    <div className="bg-[#f3f4f5] rounded-3xl p-8 border border-[#c5c6d2]/30">
      <h3 className="text-xl font-bold mb-10 text-center">「予算不足」という虚偽</h3>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-[#ba1a1a] shadow-lg">
            <MicOff className="text-[#ba1a1a] w-10 h-10" />
          </div>
          <p className="text-[10px] font-bold text-center leading-snug">窓口での拒絶<br /><span className="text-[#ba1a1a]">「予算がありません」</span></p>
        </div>
        <div className="flex-1 flex flex-col items-center relative">
          <div className="w-full h-[2px] bg-[#757682] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f3f4f5] px-3 text-[10px] font-bold text-[#ba1a1a]">矛盾</div>
          </div>
          <ChevronsRight className="text-[#00113a] w-10 h-10 mt-2" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[#00113a] flex items-center justify-center shadow-lg">
            <PiggyBank className="text-white w-10 h-10" />
          </div>
          <p className="text-[10px] font-bold text-center leading-snug text-[#00113a]">京都市 実際の余剰金<br />18,000,000,000円</p>
        </div>
      </div>
    </div>
  </section>
);

const ArchiveCard = ({ tag, date, title, person, location, description }: any) => (
  <article className="bg-white rounded-2xl p-6 shadow-md border border-[#e1e3e4] space-y-4">
    <div className="flex justify-between items-center">
      <span className={cn("text-[10px] font-bold px-3 py-1 rounded-md", tag === '支援拒否' ? "bg-[#ba1a1a]/10 text-[#ba1a1a]" : "bg-[#4c616c]/10 text-[#4c616c]")}>{tag}</span>
      <span className="text-xs font-semibold text-[#4c616c]">{date}</span>
    </div>
    <h4 className="font-bold text-lg leading-tight text-[#00113a]">{title}</h4>
    <div className="grid grid-cols-2 gap-3 text-xs font-medium text-[#444650]">
      <div className="flex items-center gap-2"><User size={14} /> {person}</div>
      <div className="flex items-center gap-2"><MapPin size={14} /> {location}</div>
    </div>
    <p className="text-sm leading-relaxed text-[#4c616c] font-medium">{description}</p>
    <div className="pt-2">
      <button className="inline-flex items-center text-xs font-extrabold text-[#00113a] hover:bg-[#00113a]/5 px-4 py-3 rounded-xl border border-[#00113a]/20 transition-all active:scale-95 gap-2">ソースを確認する <ExternalLink size={14} /></button>
    </div>
  </article>
);

const Timeline = () => (
  <section className="px-4">
    <h3 className="text-xl font-bold border-l-4 border-[#00113a] pl-3 mb-10">不作為の経緯 (Timeline)</h3>
    <div className="relative ml-5 pl-10 border-l-2 border-[#b4cad6] space-y-12">
      {[
        { date: '2023.01 - 2023.12', title: '京都市 余剰金180億円の確定', desc: '物価高騰対策予算の約40%が未執行のまま黒字へ。', color: 'bg-[#ba1a1a]' },
        { date: '2023.06', title: '市民相談件数の過去最高記録', desc: '「予算不足」を理由とした支援拒絶が全国の政令指定都市で頻発。', color: 'bg-[#00113a]' },
        { date: '2024.01', title: '主要都市の巨大余剰金（最大500億円）の可視化', desc: '大阪・名古屋・横浜などでも蓄積された「不作為の黒字」を特定。', color: 'bg-[#757682]' },
      ].map((item, i) => (
        <div key={i} className="relative">
          <div className={cn("absolute -left-[51px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm", item.color)}></div>
          <p className="text-[10px] font-extrabold text-[#4c616c] mb-1">{item.date}</p>
          <p className="text-base font-extrabold text-[#00113a]">{item.title}</p>
          <p className="text-sm font-medium text-[#444650] mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'archive'>('portal');

  const openPortal = () => {
    window.open('https://project-mana-final-release2.vercel.app', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#191c1d] max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      <Header onPortalLink={openPortal} />
      
      <main className="pt-4">
        <AnimatePresence mode="wait">
          {activeTab === 'portal' ? (
            <PortalView 
              key="portal" 
              onEnterArchive={() => setActiveTab('archive')} 
              onPortalLink={openPortal}
            />
          ) : (
            <ArchiveView key="archive" />
          )}
        </AnimatePresence>
      </main>
      
      {/* BottomNav */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#00113a]/10 px-4 py-3 pb-6 flex justify-around items-center z-50 shadow-[0_-10px_30px_rgba(0,17,58,0.05)]">
        <button 
          onClick={() => setActiveTab('portal')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === 'portal' ? "text-[#00113a] scale-110" : "text-[#4c616c] opacity-60"
          )}
        >
          <FileText size={24} fill={activeTab === 'portal' ? "currentColor" : "none"} />
          <span className="text-[10px] font-bold">報告</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#4c616c] opacity-60">
          <ClipboardCheck size={24} />
          <span className="text-[10px] font-bold">評価</span>
        </button>
        <button 
          onClick={() => setActiveTab('archive')}
          className={cn(
            "flex flex-col items-center gap-1 transition-all",
            activeTab === 'archive' ? "text-[#00113a] scale-110" : "text-[#4c616c] opacity-60"
          )}
        >
          <Archive size={24} fill={activeTab === 'archive' ? "currentColor" : "none"} />
          <span className="text-[10px] font-bold">公文書庫</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#4c616c] opacity-60">
          <TrendingUp size={24} />
          <span className="text-[10px] font-bold">傾向</span>
        </button>
      </nav>
    </div>
  );
}
