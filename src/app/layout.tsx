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
        {children}
      </body>
    </html>
  );
}
