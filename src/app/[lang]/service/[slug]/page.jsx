// src/app/[lang]/service/[slug]/page.jsx

import Header from "@/components/major/Header";
import PageBuilder from "@/components/major/PageBuilder";
import ServicePageBuilder from "@/components/major/ServiceBuilder";
import Footer from "@/components/major/Footer";
import { resolveParams } from "@/lib/params";
import { getServiceBySlug } from "@/lib/api";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";
import { DEFAULT_LANG } from "@/config";

export default async function ServiceSinglePage({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);

  const lang = parsed?.lang || DEFAULT_LANG;
  const slug = parsed?.slug;

  if (!slug) notFound();

  const service = await getServiceBySlug(slug, lang);

  if (!service) notFound();

  return (
    <>
      <Header
        lang={lang}
        currentSlug={slug}
        entryType="services"
        pathPrefix="service"
        entryId={service?.id}
      />
      <main>
        <ServicePageBuilder sections={service?.acf?.services_page_builder} lang={lang} />
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

  if (!slug) {
    return {
      title: "Service | Densou",
    };
  }

  const service = await getServiceBySlug(slug, lang);
  return buildMetadataFromYoast(service, {
    fallbackTitle: `${slug} | Densou`,
    lang,
  });
}
