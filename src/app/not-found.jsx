// src/app/not-found.jsx

import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-4 text-center">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            404
          </p>
          <h1 className="text-4xl font-semibold">Page not found</h1>
          <p className="text-gray-600 max-w-lg">
            We couldn&apos;t find the page you were looking for. Try starting
            from the English homepage.
          </p>
        </div>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-white transition hover:bg-gray-900"
        >
          Go to densou.dk
        </Link>
      </body>
    </html>
  );
}

