//src/components/major/PageBuilder.jsx

import dynamic from "next/dynamic";
import { DEFAULT_LANG } from "@/config";

const Hero = dynamic(() => import("../sections/home/HomeHero"));
const AboutUs = dynamic(() => import("../sections/home/HomeAbout"));
const ServicesSlider = dynamic(() => import("../sections/home/HomeServices"));
const HomeCounter = dynamic(() => import("../sections/home/HomeCounter"));
const HomeCaseStudies = dynamic(() => import("../sections/home/HomeCaseStudies"));
const HomeNews = dynamic(() => import("../sections/home/HomeNews"));
const InnerHero = dynamic(() => import("../sections/inner-pages/InnerHero"));
const Overview = dynamic(() => import("../sections/inner-pages/Overview"));
const CollaborationSection = dynamic(() => import("../sections/inner-pages/CollaborationSection"));
const TeamSection = dynamic(() => import("../sections/inner-pages/Teams"));
const CoreValueSection = dynamic(() => import("../sections/inner-pages/CoreValue"));

export default function PageBuilder({ sections, lang = DEFAULT_LANG }) {
  if (!sections) return null;

  return (
    <>
      {sections.map((block, i) => {
        switch (block.acf_fc_layout) {
          case "home_hero":
            return <Hero key={i} data={block} lang={lang} />;

          case "about_us_section":
            return <AboutUs key={i} data={block} lang={lang} />;

          case "services_section":
            return <ServicesSlider key={i} data={block} lang={lang} />;

          case "counter_section":
            return <HomeCounter key={i} data={block} lang={lang} />;

          case "casestudies_section":
            return <HomeCaseStudies key={i} data={block} lang={lang} />;

          case "news_section":
            return <HomeNews key={i} data={block} lang={lang} />;

          case "hero_section":
            return <InnerHero key={i} data={block} lang={lang} />;

          case "overview_section":
            return <Overview key={i} data={block} lang={lang} />;

          case "collaboration_section":
            return <CollaborationSection key={i} data={block} lang={lang} />;

          case "team_section":
            return <TeamSection key={i} data={block} lang={lang} />;

          case "core_value_section":
            return <CoreValueSection key={i} data={block} lang={lang} />;

          default:
            return null;
        }
      })}
    </>
  );
}