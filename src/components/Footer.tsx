"use client";

import Link from "next/link";
import { History, Globe2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <footer className="w-full py-8 mt-auto px-4 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-md mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/imhotep-tech/dasta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
            </svg>
            <span>{t("footerOpenSource")}</span>
          </a>
          
          <div className="w-px h-4 bg-slate-800"></div>
          
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors text-sm font-medium"
          >
            <Globe2 className="w-5 h-5" />
            <span>{t("language")}</span>
          </button>

          <div className="w-px h-4 bg-slate-800"></div>
          
          <Link
            href="/updates"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <History className="w-5 h-5" />
            <span>{t("footerChangelog")}</span>
          </Link>
        </div>

        <a
          href="https://imhoteptech.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-pink-500 transition-colors text-sm text-center px-4"
        >
          {t("footerCopyright")} <span className="font-bold text-slate-300">Imhotep Tech</span>
        </a>
      </div>
    </footer>
  );
}
