
import dynamic from "next/dynamic";
import { DEFAULT_LANG } from "@/config";

const CaseHero = dynamic(() => import("../sections/case-study/CaseHero"));

// case study page builder

export default function CaseStudyBuilder({ sections, lang = DEFAULT_LANG }) {
  if (!sections) return null;

  return (
    <>
      {sections.map((block, i) => {
        switch (block.acf_fc_layout) {
          case "hero_section":
            return <CaseHero key={i} data={block} lang={lang} />;

          default:
            return null;
        }
      })}
    </>
  );
}