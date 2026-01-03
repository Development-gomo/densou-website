"use client";

import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "../../../../public/right-arrow.svg";

export default function CaseCtaBanner({ data, lang = "en" }) {
  if (!data) return null;

  const { heading, short_text, cta_text, cta_url } = data;

  return (
    <section className="py-12 md:py-24 bg-[var(--color-brand)] text-white">
      <div className="web-width px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* LEFT – BIG HEADING */}
          {heading && (
            <h2
              className="text-[36px] md:text-[48px] leading-[44px] md:leading-[56px] font-medium"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}

          {/* RIGHT – TEXT + CTA */}
          <div className="max-w-[420px]">
            {short_text && (
              <p className="text-white/90 mb-6">
                {short_text}
              </p>
            )}

            {cta_text && cta_url && (
              <Link
                href={
                  cta_url.startsWith("/")
                    ? lang === "en"
                      ? cta_url
                      : `/${lang}${cta_url}`
                    : cta_url
                }
                className="
                  gap-3 group relative inline-flex items-center
                  rounded-sm bg-[var(--color-accent)] px-6 py-4
                  text-black font-medium
                  transition-all duration-300
                  w-[180px] overflow-hidden select-none
                "
              >
                {/* LEFT DOT */}
                <span className="relative w-6 flex items-center justify-center">
                  <span
                    className="
                      absolute h-2 w-2 rounded-full bg-[#191F68]
                      transition-all duration-300 ease-out
                      group-hover:opacity-0 group-hover:-translate-x-1
                    "
                  />
                </span>

                {/* TEXT */}
                <span
                  className="
                    flex-1 text-[16px] leading-none
                    transition-all duration-300 ease-out
                    group-hover:-translate-x-4
                    whitespace-nowrap
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
                      group-hover:opacity-100 group-hover:-translate-x-2
                    "
                  >
                    <Image src={ArrowSvg} width={13} height={13} alt="arrow" />
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
