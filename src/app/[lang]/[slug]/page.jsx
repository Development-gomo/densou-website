// src/app/[lang]/[slug]/page.jsx

import { getPageBySlug } from "@/lib/api";
import { resolveParams } from "@/lib/params";
import PageBuilder from "@/components/major/PageBuilder";
import Header from "@/components/major/Header";
import Footer from "@/components/major/Footer";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";
import { DEFAULT_LANG } from "@/config";

export default async function SinglePage({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);

  const lang = parsed?.lang || DEFAULT_LANG;
  const slug = parsed?.slug;

  if (!slug) notFound();

  const data = await getPageBySlug(slug, lang);
  if (!data) notFound();
  const acf = data?.acf || {};

  return (
    <>
      <Header lang={lang} currentSlug={slug} />
      <main>
        <PageBuilder sections={acf.page_builder} />
      </main>
      <Footer lang={lang} currentSlug={slug} />
    </>
  );
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);
  const lang = parsed?.lang || DEFAULT_LANG;
  const slug = parsed?.slug;
  const data = await getPageBySlug(slug, lang);
  return buildMetadataFromYoast(data, {
    fallbackTitle: slug ? `${slug} | Densou` : "Densou",
    lang,
  });
}