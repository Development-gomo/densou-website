//src/app/[lang]/page.jsx

import { getPageBySlug } from "@/lib/api";
import { resolveParams } from "@/lib/params";
import PageBuilder from "@/components/major/PageBuilder";
import Header from "@/components/major/Header";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";

export default async function HomePage({ params }) {
  // ✅ unwrap and parse Next 16 serialized params
  const resolved = await params;
  const parsed = resolveParams(resolved);

  const lang = parsed?.lang || "en";
  const data = await getPageBySlug("frontpage", lang);
  if (!data) notFound();
  const acf = data?.acf || {};

  return (
    <>
      <Header lang={lang} currentSlug="/" />
      <main>
        <PageBuilder sections={acf.page_builder} lang={lang} />
      </main>
    </>
  );
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);
  const lang = parsed?.lang || "en";
  const data = await getPageBySlug("frontpage", lang);
  return buildMetadataFromYoast(data, {
    fallbackTitle: "Densou",
    lang,
  });
}

