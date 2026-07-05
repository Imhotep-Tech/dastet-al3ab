import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import updates from "@/data/updates-history.json";
import Footer from "@/components/Footer";

export default function UpdatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#02020f]">
      <header className="sticky top-0 z-10 bg-[#02020f]/80 backdrop-blur-md border-b border-slate-900 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-pink-500" />
            سجل التحديثات
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0d21] border border-slate-800 hover:bg-[#141432] hover:border-pink-500/50 text-slate-200 text-sm font-medium transition-colors"
          >
            رجوع
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-12">
        <div className="space-y-12 relative before:absolute before:inset-0 before:start-10 before:h-full before:w-0.5 before:bg-slate-900">
          {updates.map((update, idx) => (
            <div key={idx} className="relative flex items-start gap-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#02020f] bg-pink-500 text-white shrink-0 z-10 shadow-lg shadow-pink-500/20">
                <History className="w-5 h-5" />
              </div>
              <div className="flex-1 pt-1">
                <div className="p-5 rounded-2xl border border-slate-900 bg-[#0d0d21] shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-pink-500">{update.version}</span>
                    <time className="text-sm font-medium text-slate-500 bg-slate-950 px-3 py-1 rounded-full">{update.date}</time>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {update.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-slate-300 text-sm flex items-start gap-3 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-500/50 shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={update.commitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-pink-500 transition-colors bg-slate-950 px-4 py-2 rounded-lg"
                  >
                    عرض الكود (Commit)
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
