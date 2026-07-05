"use client";

import { useState, useEffect } from "react";
import { Download, X, Layers } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Check if user has already dismissed this banner in the current session
      const isDismissed = sessionStorage.getItem("dasta_install_dismissed");
      if (!isDismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If app is already installed, hide banner
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowBanner(false);
      console.log("Dasta was installed successfully!");
    };
    
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the native browser install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("dasta_install_dismissed", "true");
  };

  if (!showBanner || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-[#0d0d21]/90 backdrop-blur-xl border border-cyan-400/40 rounded-3xl p-5 shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex gap-4 items-center relative overflow-hidden">
        
        {/* Subtle decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-pink-500/10 blur-xl rounded-full pointer-events-none"></div>
        
        {/* Logo Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-500 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20">
          <Layers className="w-6 h-6 text-white" />
        </div>
        
        {/* Banner Copy */}
        <div className="flex-1 min-w-0 text-right pr-1">
          <h4 className="text-white font-black text-base mb-0.5">تثبيت تطبيق دستة 📱</h4>
          <p className="text-slate-300 text-xs leading-relaxed font-bold">
            العب جميع الألعاب بدون إنترنت وبأداء أسرع عند تثبيت التطبيق على جهازك.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border border-cyan-400/50"
          >
            <Download className="w-3.5 h-3.5" />
            تثبيت
          </button>
          
          <button
            onClick={handleDismiss}
            className="flex items-center justify-center gap-1 px-4 py-1.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            <X className="w-3 h-3" />
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
