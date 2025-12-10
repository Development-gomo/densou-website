//src/components/major/PageBuilder.jsx

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../sections/HomeHero"));
const AboutUs = dynamic(() => import("../sections/HomeAbout"));
const ServicesSlider = dynamic(() => import("../sections/HomeServices"));
const HomeCounter = dynamic(() => import("../sections/HomeCounter"));
const HomeCaseStudies = dynamic(() => import("../sections/HomeCaseStudies"));
const HomeNews = dynamic(() => import("../sections/HomeNews"));

export default function PageBuilder({ sections, lang = "en" }) {
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

          default:
            return null;
        }
      })}
    </>
  );
}
