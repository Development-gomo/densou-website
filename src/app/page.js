//src/app/page.js

import { getPageBySlug } from "@/lib/api";
import PageBuilder from "@/components/major/PageBuilder";
import Header from "@/components/major/Header";
import Footer from "@/components/major/Footer";
import { buildMetadataFromYoast } from "@/lib/seo";
import { DEFAULT_LANG } from "@/config";

export default async function HomePage() {
  const lang = DEFAULT_LANG;
  const data = await getPageBySlug("frontpage", lang);
  const acf = data?.acf || {};

  return (
    <>
      <Header lang={lang} currentSlug="/" />
      <main id="home">
        <PageBuilder sections={acf.page_builder} lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export async function generateMetadata() {
  const lang = DEFAULT_LANG;
  const page = await getPageBySlug("frontpage", lang);
  return buildMetadataFromYoast(page, { lang });
}