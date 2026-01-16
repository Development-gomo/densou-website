// src/components/major/CasestudyBuilder.jsx

import dynamic from "next/dynamic";
import { DEFAULT_LANG } from "@/config";

const CaseHero = dynamic(() => import("../sections/case-study/CaseHero"));
const RealtedCase = dynamic(() => import("../sections/case-study/RealtedCase"));
const CaseCtaBanner = dynamic(() => import("../sections/case-study/CtaBanner"));
const ResultSection = dynamic(() => import("../sections/case-study/ResultSection"));
const TestimonialBanner = dynamic(() => import("../sections/case-study/TestimonialBanner"));
const CaseIntroduction = dynamic(() => import("../sections/case-study/Introduction"));
const StorySection = dynamic(() => import("../sections/case-study/TheStory"));

// case study page builder

export default function CaseStudyBuilder({ sections, lang = DEFAULT_LANG }) {
  if (!sections) return null;

  return (
    <>
      {sections.map((block, i) => {
        switch (block.acf_fc_layout) {
          case "hero_section":
            return <CaseHero key={i} data={block} lang={lang} />;
          case "casestudies_section":
            return <RealtedCase key={i} data={block} lang={lang} />;
          case "cta_banner":
            return <CaseCtaBanner key={i} data={block} lang={lang} />;
          case "result_section":
              return <ResultSection key={i} data={block} lang={lang} />;
          case "testimonial_banner":
              return <TestimonialBanner key={i} data={block} lang={lang} />;
          case "introduction_section":
              return <CaseIntroduction key={i} data={block} lang={lang} />;
          case "story_section":
              return <StorySection key={i} data={block} lang={lang} />;

          default:
            return null;
        }
      })}
    </>
  );
}