"use client";

import Image from "next/image";

export default function KeyProblemSection({ data }) {
  const {
    bg_image,
    sub_heading,
    heading,
    key_problem = [],
  } = data;

  return (
    <section id="key-problems" className="relative w-full overflow-hidden text-white">
      {/* BACKGROUND */}
      {bg_image?.url && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bg_image.url}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/0" />
        </div>
      )}

      <div className="web-width px-6 py-12 md:py-30">

        {/* SUB HEADING */}
        {sub_heading && (
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            <span className="subheading-label text-white">
              {sub_heading}
            </span>
          </div>
        )}

        {/* MAIN HEADING */}
        {heading && (
          <h2
            className="section-heading max-w-4xl mb-14"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}

        {/* CARDS GRID */}
        <div className="grid gap-2 md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {key_problem.map((item, index) => (
            <div
              key={index}
              className="
                rounded-sm bg-white/10 backdrop-blur-md 
                p-6 md:p-8
              "
            >
              {/* ICON */}
              {item.icon?.url && (
                <Image
                  src={item.icon.url}
                  alt={item.heading || "icon"}
                  width={40}
                  height={40}
                  className="object-contain mb-10 md:mb-20"
                />
              )}

              {/* TITLE */}
              {item.heading && (
                <h3 className="text-[24px] mb-3">
                  {item.heading}
                </h3>
              )}

              {/* TEXT */}
              {item.short_text && (
                <p className="text-white">
                  {item.short_text}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
