// src/app/[lang]/case-study/[slug]/page.jsx

import Header from "@/components/major/Header";
import PageBuilder from "@/components/major/PageBuilder";
import { resolveParams } from "@/lib/params";
import { getCaseStudyBySlug, getMediaById } from "@/lib/api";
import { buildMetadataFromYoast } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";

function CaseStudyBody({ entry }) {
  const sections = entry?.acf?.page_builder;
  const contentHtml = entry?.content?.rendered;

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
      Content for this case study will be available soon.
    </p>
  );
}

export default async function CaseStudySinglePage({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);

  const lang = parsed?.lang || "en";
  const slug = parsed?.slug;

  if (!slug) notFound();

  const caseStudy = await getCaseStudyBySlug(slug, lang);

  if (!caseStudy) notFound();

  const featuredMedia = await getMediaById(caseStudy.featured_media);
  const heroImage =
    featuredMedia?.media_details?.sizes?.full?.source_url ||
    featuredMedia?.source_url ||
    null;

  return (
    <>
      <Header
        lang={lang}
        currentSlug={slug}
        entryType="case_study"
        pathPrefix="case-study"
      />
      <main className="px-4 py-12 space-y-8">
        <article className="max-w-4xl mx-auto space-y-6">
          {caseStudy?.title?.rendered && (
            <h1
              className="text-4xl font-semibold"
              dangerouslySetInnerHTML={{ __html: caseStudy.title.rendered }}
            />
          )}

          {caseStudy?.excerpt?.rendered && (
            <div
              className="text-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: caseStudy.excerpt.rendered }}
            />
          )}

          {heroImage && (
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
              <Image
                src={heroImage}
                alt={caseStudy?.title?.rendered || "Case study hero image"}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
              />
            </div>
          )}

          <CaseStudyBody entry={caseStudy} />
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
      title: "Case Study | Densou",
    };
  }

  const caseStudy = await getCaseStudyBySlug(slug, lang);
  return buildMetadataFromYoast(caseStudy, {
    fallbackTitle: `${slug} | Densou`,
    lang,
  });
}

