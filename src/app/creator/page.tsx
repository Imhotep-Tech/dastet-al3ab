"use client";
import React, { useState } from 'react';
import PortalNav from '../../components/PortalNav';

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState<'github' | 'email'>('github');
  
  // Email Form State
  const [authorName, setAuthorName] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [engineType, setEngineType] = useState('mcq');
  const [gameInstructions, setGameInstructions] = useState('');
  const [cardsContent, setCardsContent] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`إضافة لعبة جديدة: ${gameTitle}`);
    const body = encodeURIComponent(
      `اسم الصانع: ${authorName}\n\n` +
      `اسم اللعبة: ${gameTitle}\n\n` +
      `نوع اللعبة: ${engineType}\n\n` +
      `إرشادات اللعبة:\n${gameInstructions}\n\n` +
      `البطاقات / الأسئلة:\n${cardsContent}\n\n` +
      `---\nملاحظة للفريق: يرجى مراجعة هذه اللعبة وإضافتها إلى Dastet Al3ab.`
    );
    window.location.href = `mailto:imhoteptech@outlook.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PortalNav />
      <div className="max-w-5xl mx-auto p-4 sm:p-8 mt-6">
        <h1 className="text-4xl font-black mb-8 text-center text-slate-100">إضافة ألعاب جديدة</h1>
        
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('github')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all cursor-pointer ${activeTab === 'github' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'}`}
          >
            الإضافة عبر GitHub (موصى به وأسرع)
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all cursor-pointer ${activeTab === 'email' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'}`}
          >
            الإرسال عبر البريد الإلكتروني
          </button>
        </div>

        {activeTab === 'github' && (
          <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
            
            <h2 className="text-3xl font-black text-white mb-6">ساهم عبر GitHub بالخطوات المفصلة</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              لإضافة لعبتك بشكل أسرع والحصول على لقب &quot;مساهم&quot; رسمي، يمكنك إضافة اللعبة مباشرة إلى الكود المصدري عبر GitHub. اتبع هذه الخطوات بالتفصيل:
            </p>
            
            <div className="space-y-6 text-right">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850">
                <h3 className="text-xl font-bold text-indigo-400 mb-3">الخطوة الأولى: تجهيز الملفات</h3>
                <p className="text-slate-300 leading-relaxed">
                  تحتاج إلى إنشاء ملفين JSON (أو تعديل الملفات الحالية إذا كنت تضيف بطاقات للعبة موجودة):<br/>
                  1. <strong className="text-white">ملف إعدادات اللعبة</strong> (مثال: <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400">my-game.json</code>) يوضع في مجلد <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400">src/data/games/</code>.<br/>
                  2. <strong className="text-white">ملف البطاقات</strong> (مثال: <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400">my-game-cards.json</code>) يوضع في مجلد <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400">src/data/cards/</code>.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850">
                <h3 className="text-xl font-bold text-indigo-400 mb-3">الخطوة الثانية: رفع التعديلات (Pull Request)</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 leading-relaxed">
                  <li>قم بإنشاء حساب في GitHub وادخل على مستودع اللعبة: <a href="https://github.com/Imhotep-Tech/dastet-al3ab" target="_blank" className="text-indigo-400 underline">Imhotep-Tech/dastet-al3ab</a>.</li>
                  <li>اضغط على زر <strong>Fork</strong> لنسخ المشروع إلى حسابك.</li>
                  <li>قم بإضافة ملفاتك في المجلدات المذكورة أعلاه.</li>
                  <li>بعد الانتهاء، اضغط على <strong>Commit changes</strong> ثم افتح <strong>Pull Request</strong>.</li>
                </ul>
              </div>
              
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-855">
                <h3 className="text-xl font-bold text-indigo-400 mb-3">الخطوة الثالثة: المراجعة والنشر</h3>
                <p className="text-slate-300 leading-relaxed">
                  بمجرد إرسالك للـ Pull Request، سيقوم فريقنا بمراجعة الأكواد والأسئلة لضمان جودتها، ثم سيتم دمجها في اللعبة لتظهر فوراً لجميع اللاعبين!
                </p>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <a 
                href="https://github.com/Imhotep-Tech/dastet-al3ab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl rounded-xl transition-colors flex items-center justify-center gap-3 shadow-md cursor-pointer"
              >
                الذهاب إلى مستودع المشروع
                <svg className="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-xl">
            <h2 className="text-3xl font-black text-white mb-4">إرسال لعبتك عبر البريد الإلكتروني</h2>
            <p className="text-slate-400 mb-8">
              إذا لم تكن على دراية بـ GitHub، املأ هذا النموذج وسيقوم النظام بتجهيز رسالة بريد إلكتروني تلقائياً لترسلها إلينا!
            </p>
            
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">اسمك (صانع اللعبة)</label>
                  <input type="text" required value={authorName} onChange={e=>setAuthorName(e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="مثال: أحمد مصطفى" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">اسم اللعبة أو الحزمة</label>
                  <input type="text" required value={gameTitle} onChange={e=>setGameTitle(e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="مثال: أسئلة تاريخية" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">نوع اللعبة</label>
                <select value={engineType} onChange={e=>setEngineType(e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                  <option value="mcq">سؤال وجواب / خيارات متعددة</option>
                  <option value="hot-potato">البطاطس الساخنة (سرعة بديهة)</option>
                  <option value="taboo">كلمات ممنوعة</option>
                  <option value="imposter">الجاسوس</option>
                  <option value="classic">كلاسيكي دوري</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">تعليمات وشروط اللعبة (إن وجدت)</label>
                <textarea rows={3} value={gameInstructions} onChange={e=>setGameInstructions(e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="اشرح كيف تُلعب اللعبة..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">البطاقات والأسئلة (اكتبها هنا بوضوح)</label>
                <textarea required rows={8} value={cardsContent} onChange={e=>setCardsContent(e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="مثال:&#10;السؤال: ما هي عاصمة مصر؟&#10;الخيارات: القاهرة، الإسكندرية، أسوان، الجيزة&#10;الإجابة: القاهرة&#10;---&#10;السؤال: ..."></textarea>
              </div>

              <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xl transition-all shadow-md cursor-pointer">
                تجهيز البريد الإلكتروني وإرساله
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
