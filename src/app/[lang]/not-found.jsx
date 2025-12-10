// src/app/[lang]/not-found.jsx

import Link from "next/link";
import Header from "@/components/major/Header";
import { resolveParams } from "@/lib/params";

export default async function LangScopedNotFound({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);
  const lang = parsed?.lang || "en";

  return (
    <>
      <Header lang={lang} />
       <div className="h-[72px] w-full bg-black"></div> 
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          404
        </p>
        <h1 className="text-4xl font-semibold">
          The page you&apos;re looking for doesn&apos;t exist.
        </h1>
        <p className="text-gray-600 max-w-xl">
          It might have been removed, renamed, or is temporarily unavailable.
          Please double-check the URL or head back to the homepage.
        </p>
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 rounded-md bg-black px-6 py-3 text-white transition hover:bg-gray-900"
        >
          Go to homepage
        </Link>
      </main>
    </>
  );
}

