// src/app/[lang]/service/[slug]/page.jsx

import Header from "@/components/major/Header";
import PageBuilder from "@/components/major/PageBuilder";
import { resolveParams } from "@/lib/params";
import { getServiceBySlug } from "@/lib/api";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";

function ServiceBody({ service }) {
  const sections = service?.acf?.page_builder;
  const contentHtml = service?.content?.rendered;

  if (Array.isArray(sections) && sections.length > 0) {
    return <PageBuilder sections={sections} lang={lang} />;
  }

  if (contentHtml) {
    return (
      <div
        className="prose prose-lg max-w-3xl mx-auto"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    );
  }

  return (
    <p className="text-center text-gray-500">
      Content for this service will be available soon.
    </p>
  );
}

export default async function ServiceSinglePage({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);

  const lang = parsed?.lang || "en";
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
      />
      <main className="px-4 py-12">
        <article className="max-w-4xl mx-auto space-y-6">
          {service?.title?.rendered && (
            <h1
              className="text-4xl font-semibold"
              dangerouslySetInnerHTML={{ __html: service.title.rendered }}
            />
          )}

          {service?.excerpt?.rendered && (
            <div
              className="text-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: service.excerpt.rendered }}
            />
          )}

          <ServiceBody service={service} />
        </article>
      </main>
    </>
  );
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);
  const lang = parsed?.lang || "en";
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

