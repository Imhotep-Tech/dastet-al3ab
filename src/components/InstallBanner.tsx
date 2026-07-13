"use client";

import { useEffect, useState } from "react";
import { Download, X, Share, PlusSquare } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function InstallBanner() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSamsungOrUnsupported, setIsSamsungOrUnsupported] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Check if user has permanently dismissed the banner
    const dismissed = localStorage.getItem('installBannerDismissed');
    
    // User agent checks
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isSamsungBrowser = /SamsungBrowser/.test(ua);
    
    setIsIOS(isIOSDevice);
    if (isSamsungBrowser) {
       setIsSamsungOrUnsupported(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (dismissed !== 'true') {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If it's iOS or Samsung and not dismissed, show the banner
    if ((isIOSDevice || isSamsungBrowser) && dismissed !== 'true') {
      // Check if not installed
      if (!window.matchMedia("(display-mode: standalone)").matches && !(window.navigator as any).standalone) {
        setIsVisible(true);
      }
    }

    // Custom event to trigger from Footer
    const handleTriggerInstall = () => {
      if (isIOSDevice) {
        setShowIOSModal(true);
      } else if (isSamsungBrowser) {
        setIsVisible(true);
      } else if (deferredPrompt) {
        handleInstallClick();
      } else {
        // If no prompt is available, just show the banner
        setIsVisible(true);
      }
    };

    window.addEventListener('trigger-install', handleTriggerInstall);

    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener('trigger-install', handleTriggerInstall);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      setIsVisible(false);
      return;
    }
    
    if (isSamsungOrUnsupported) {
      return;
    }

    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('installBannerDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible && !showIOSModal) return null;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-in slide-in-from-bottom-12 duration-500">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-bronze/10 border border-brand-bronze/20 flex items-center justify-center text-brand-bronze shrink-0">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">{t("installTitle")}</h4>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  {isSamsungOrUnsupported ? t("installUnsupported") : t("installDesc")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isSamsungOrUnsupported && (
                <button
                  onClick={handleInstallClick}
                  className="px-4 py-2 bg-brand-maroon hover:bg-brand-maroon-hover text-brand-cream border border-brand-bronze/20 rounded-xl font-bold text-xs shadow-md transition-colors active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {t("installButton")}
                </button>
              )}
              
              <button
                onClick={handleDismiss}
                className="p-2 text-slate-500 hover:text-slate-350 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Install Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-bronze/10 border border-brand-bronze/20 flex items-center justify-center text-brand-bronze mb-4">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t("installIOS")}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                <Share className="w-6 h-6 text-brand-bronze shrink-0" />
                <p className="text-slate-300 text-sm font-medium text-left">{t("installIOSStep1")}</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                <PlusSquare className="w-6 h-6 text-brand-bronze shrink-0" />
                <p className="text-slate-300 text-sm font-medium text-left">{t("installIOSStep2")}</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                <span className="text-brand-bronze font-bold text-lg w-6 text-center shrink-0">Add</span>
                <p className="text-slate-300 text-sm font-medium text-left">{t("installIOSStep3")}</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
