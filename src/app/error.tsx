"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route boundary caught error:", error);
  }, [error]);

  return (
    <div className="p-10 bg-red-950 text-red-400 w-full min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">حدث خطأ غير متوقع!</h2>
      <pre className="bg-black/50 p-4 rounded-xl overflow-auto text-sm w-full max-w-2xl text-left" dir="ltr">{error.message}</pre>
      <pre className="bg-black/50 p-4 rounded-xl overflow-auto text-xs mt-4 w-full max-w-2xl text-left" dir="ltr">{error.stack}</pre>
      <button
        className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition"
        onClick={() => reset()}
      >
        حاول مرة أخرى
      </button>
    </div>
  );
}
