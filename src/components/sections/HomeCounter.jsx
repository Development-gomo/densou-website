// src/components/sections/HomeCounter.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowSvg from "../../../public/right-arrow.svg";

export default function HomeCounter({ data, lang = "en" }) {
  if (!data) return null;

  const {
    sub_heading,
    heading,
    short_text,
    cta_text,
    cta_url,
    bg_image,
    counters = [],
  } = data;

  return (
    <section className="relative w-full py-12 md:py-44 text-white">

      {/* BACKGROUND IMAGE */}
      {bg_image?.url && (
        <Image
          src={bg_image.url}
          alt="background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}

      {/* DARK GRADIENT LAYER */}
      <div className="absolute inset-0 bg-black/00 -z-10"></div>

      <div className="web-width px-6 grid lg:grid-cols-2 gap-2 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* SUBHEADING */}
          {sub_heading && (
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#27E0C0]"></span>
              <span className="subheading-label text-white ">
                {sub_heading}
              </span>
            </div>
          )}

          {/* MAIN HEADING */}
          <div
            className="section-heading text-white mb-6"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {/* DESCRIPTION */}
          {short_text && (
            <div className="text-white max-w-[420px] mb-8"
              dangerouslySetInnerHTML={{ __html: short_text }}
            />
          )}

          {/* CTA BUTTON */}
          {cta_text && cta_url && (
            <Link
              href={cta_url.startsWith("/") ? `/${lang}${cta_url}` : cta_url}
              className="
                gap-3 group relative inline-flex items-center
                rounded-sm bg-[#151B5D] px-6 py-4 text-white
                transition-all duration-300 hover:bg-[#151B5D]
                w-[154px] overflow-hidden select-none">
              {/* DOT */}
              <span className="relative w-6 flex items-center justify-center">
                <span
                  className="
                    absolute h-2 w-2 rounded-full bg-[#27E0C0]
                    transition-all duration-300 ease-out
                    group-hover:opacity-0 group-hover:-translate-x-1
                  "
                ></span>
              </span>

              {/* TEXT */}
              <span
                className="
                  flex-1 text-[16px] leading-none whitespace-nowrap
                  transition-all duration-300 ease-out
                  group-hover:-translate-x-3
                "
              >
                {cta_text}
              </span>

              {/* ARROW */}
              <span className="relative w-4 flex items-center justify-center">
                <span
                  className="
                    w-4 absolute opacity-0 -translate-x-4
                    transition-all duration-300 ease-out
                    group-hover:opacity-100 group-hover:-translate-x-1
                  "
                >
                  <Image src={ArrowSvg} width={13} height={13} alt="arrow" />
                </span>
              </span>
            </Link>
          )}
        </div>

        {/* RIGHT COUNTERS GRID */}
        <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
          {counters.map((item, i) => (
            <div
              key={i}
              className=" md:w-[300px] p-4
                lg:px-10 lg:py-8 rounded-sm backdrop-blur-[24px] bg-white/10
                shadow-lg
              "
            >
              <p className="font-semibold text-[50px] leading-[68px] lg:text-[64px] lg:leading-[78px] mb-2">
                {item.number}{item.suffix}
              </p>
              <p className="text-white/80">
                {item.short_text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
