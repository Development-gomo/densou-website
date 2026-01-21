// src/app/[lang]/case-study/[slug]/page.jsx

import Header from "@/components/major/Header";
import CaseStudyBuilder from "@/components/major/CasestudyBuilder";
import Footer from "@/components/major/Footer";
import { resolveParams } from "@/lib/params";
import { getCaseStudyBySlug } from "@/lib/api";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";
import { DEFAULT_LANG } from "@/config";

export default async function CaseStudySinglePage({ params }) {
  const resolved = await params;
  const parsed = resolveParams(resolved);

  const lang = parsed?.lang || DEFAULT_LANG;
  const slug = parsed?.slug;

  if (!slug) notFound();

  const caseStudy = await getCaseStudyBySlug(slug, lang);

  if (!caseStudy) notFound();

  return (
    <>
      <Header
        lang={lang}
        currentSlug={slug}
        entryType="case_study"
        pathPrefix="case-study"
        entryId={caseStudy?.id}
      />
      <main>
        <CaseStudyBuilder sections={caseStudy?.acf?.case_study_builder} lang={lang} />
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
      title: "Case Study | Densou",
    };
  }

  const caseStudy = await getCaseStudyBySlug(slug, lang);
  return buildMetadataFromYoast(caseStudy, {
    fallbackTitle: `${slug} | Densou`,
    lang,
  });
}
