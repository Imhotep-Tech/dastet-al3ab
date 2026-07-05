import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Dasta (دستة) - لعبة الحفلات",
  description: "منصة دستة المفتوحة المصدر لألعاب الحفلات والتجمعات من تطوير Imhotep Tech",
  manifest: "/manifest.json",
};

import SyncButton from "@/components/SyncButton";
import InstallBanner from "@/components/InstallBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#02020f] text-slate-50 font-cairo overflow-x-hidden selection:bg-pink-500/30">
        <LanguageProvider>
          <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
        <InstallBanner />
        <footer className="w-full bg-[#02020f] border-t border-slate-900 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2026 Imhotep Tech. جميع الحقوق محفوظة.</p>
            <SyncButton />
          </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
