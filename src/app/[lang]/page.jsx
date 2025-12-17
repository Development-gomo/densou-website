//src/app/[lang]/page.jsx

import Header from "@/components/major/Header";
import PageBuilder from "@/components/major/PageBuilder";
import Footer from "@/components/major/Footer";
import { getPageBySlug } from "@/lib/api";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";

export default async function LangHomePage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const page = await getPageBySlug("frontpage", lang);

  if (!page) notFound();

  return (
    <>
      <Header lang={lang} />
      <main id="home">
        <PageBuilder sections={page?.acf?.page_builder} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = await getPageBySlug("frontpage", resolvedParams.lang);
  return buildMetadataFromYoast(page, { lang: resolvedParams.lang });
}
