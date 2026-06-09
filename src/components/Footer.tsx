import Link from "next/link";
import { History } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto px-4 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-md mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/imhotep-tech/im7o"
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
            <span>المصدر المفتوح</span>
          </a>
          
          <div className="w-px h-4 bg-slate-700"></div>
          
          <Link
            href="/updates"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <History className="w-5 h-5" />
            <span>سجل التحديثات</span>
          </Link>
        </div>

        <a
          href="https://imhoteptech.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-indigo-400 transition-colors text-sm text-center px-4"
        >
          بكل فخر وبشكل مفتوح المصدر من تطوير <span className="font-bold text-slate-300">Imhotep Tech</span>
        </a>
      </div>
    </footer>
  );
}
