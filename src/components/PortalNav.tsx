"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PortalNav() {
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-40 w-full py-4 px-6 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md flex items-center justify-between">
      <Link href="/play" className="flex items-center gap-3">
        <img src="/dasta.png" alt="Dastet Al3ab Logo" className="h-14 w-auto object-contain cursor-pointer" />
      </Link>

      <Link
        href="/creator"
        className="flex items-center gap-2 px-5 py-2.5 bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/30 rounded-full font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>{t("navAddGame")}</span>
      </Link>
    </nav>
  );
}
