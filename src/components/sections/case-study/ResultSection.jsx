"use client";

import React from "react";

export default function ResultSection({ data }) {
  if (!data) return null;

  const { sub_heading, heading, counters = [] } = data;

  return (
    <section className="py-12 md:py-30 bg-white">
      <div className="web-width px-6">

        {/* SUB HEADING */}
        {sub_heading && (
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
            <span className="subheading-label text-[#8C8FA3] uppercase">
              {sub_heading}
            </span>
          </div>
        )}

        {/* MAIN HEADING */}
        {heading && (
          <div
            className="section-heading max-w-[780px] mb-16"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}

        {/* RESULTS GRID */}
        {counters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.map((item, index) => (
              <div
                key={index}
                className="bg-[#F4F4F6] rounded-lg p-8 flex flex-col justify-between min-h-[240px]"
              >
                {/* NUMBER */}
                <div className="flex items-start">
                  <span className="text-[64px] leading-[72px] font-medium text-black">
                    {item.number}
                  </span>

                  {item.suffix && (
                    <span className="text-[32px] leading-[36px] font-medium text-[var(--color-accent)] ml-1 mt-2">
                      {item.suffix}
                    </span>
                  )}
                </div>

                {/* DESCRIPTION */}
                {item.short_text && (
                  <div
                    className=" mt-6 max-w-[240px]"
                    dangerouslySetInnerHTML={{ __html: item.short_text }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
