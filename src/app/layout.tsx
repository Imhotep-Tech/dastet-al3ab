import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Im7o (إيمحو) - لعبة الحفلات",
  description: "منصة إيمحو المفتوحة المصدر لألعاب الحفلات والتجمعات من تطوير Imhotep Tech",
  manifest: "/manifest.json",
};

import SyncButton from "@/components/SyncButton";

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
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50 font-cairo overflow-x-hidden selection:bg-indigo-500/30">
        <div className="fixed top-4 left-4 z-50">
          <SyncButton />
        </div>
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
        <footer className="w-full bg-slate-950 border-t border-slate-900 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2026 Imhotep Tech. جميع الحقوق محفوظة.</p>
            <SyncButton />
          </div>
        </footer>
      </body>
    </html>
  );
}
