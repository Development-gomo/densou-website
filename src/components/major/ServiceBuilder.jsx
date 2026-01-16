//src/components/major/ServiceBuilder.jsx

import dynamic from "next/dynamic";
import { DEFAULT_LANG } from "@/config";

const ServiceHero = dynamic(() => import("../sections/service/ServiceHero"));
const RealtedCase = dynamic(() => import("../sections/service/RealtedCase"));
const ServiceOverview = dynamic(() => import("../sections/service/Overview"));
const RelatedServices = dynamic(() => import("../sections/service/RelatedServices"));
const Faq = dynamic(() => import("../sections/service/Faq")); 
const WhyChoose = dynamic(() => import("../sections/service/WhyChoose"));
const OurApproach = dynamic(() => import("../sections/service/OurApproach"));
const OurServicesSection = dynamic(() => import("../sections/service/OurServicesSection"));
const KeyProblemSection = dynamic(() => import("../sections/service/KeyProblemSection"));

// Service page builder

export default function ServicePageBuilder({ sections, lang = DEFAULT_LANG }) {
  if (!sections) return null;

  return (
    <>
      {sections.map((block, i) => {
        switch (block.acf_fc_layout) {
          case "hero_section":
            return <ServiceHero key={i} data={block} lang={lang} />;
          case "overview_section":
            return <ServiceOverview key={i} data={block} lang={lang} />;
          case "casestudies_section":
            return <RealtedCase key={i} data={block} lang={lang} />;
          case "services_section": 
            return <RelatedServices key={i} data={block} lang={lang} />; 
          case "faq_section": 
            return <Faq key={i} data={block} lang={lang} />;
          case "why_choose_section": 
            return <WhyChoose key={i} data={block} lang={lang} />;
          case "our_approach_section": 
            return <OurApproach key={i} data={block} lang={lang} />;  
          case "our_services_section":
            return <OurServicesSection key={i} data={block} lang={lang} />;  
          case "key_problem_section":
            return <KeyProblemSection key={i} data={block} lang={lang} />;  
          default:
            return null;
        }
      })}
    </>
  );
}