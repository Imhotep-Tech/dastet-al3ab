"use client";

import React from 'react';
import Link from 'next/link';

export default function PortalNav() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 p-4 flex justify-between items-center w-full sticky top-0 z-50">
      <div className="flex items-center space-x-4 space-x-reverse">
        <Link href="/">
           <img src="/dasta.png" alt="Dasta Logo" className="h-10 cursor-pointer animate-pulse" />
        </Link>
        <span className="text-xl font-black bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Dasta Games</span>
      </div>
      <div className="flex items-center space-x-4 space-x-reverse">
         <Link href="/play" className="px-5 py-2 bg-yellow-500 text-slate-950 rounded-xl hover:shadow-yellow-500/25 hover:shadow-lg font-bold transition-all text-sm active:scale-95">ابدأ اللعب</Link>
      </div>
    </nav>
  );
}
