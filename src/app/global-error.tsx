"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global boundary caught error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="p-10 bg-red-950 text-red-400 min-h-screen">
          <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
          <pre className="bg-black/50 p-4 rounded-xl overflow-auto text-sm">{error.message}</pre>
          <pre className="bg-black/50 p-4 rounded-xl overflow-auto text-xs mt-4">{error.stack}</pre>
          <button
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
