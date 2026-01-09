"use client";

import React, { useState } from "react";

export default function Faq({ data }) {
  const { sub_heading, heading, faqs } = data;

  const [activeIndex, setActiveIndex] = useState(null);

  // Function to handle toggling the accordion
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[var(--color-brand)] text-white">
      <div className="py-12 md:py-30 web-width px-6">
        {/* Sub Heading */}
        {sub_heading && (
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
            <span className="subheading-label uppercase">{sub_heading}</span>
          </div>
        )}

        {/* Heading */}
        {heading && (
          <div
            className="section-heading mb-6"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}

        {/* FAQ List */}
        <div className="faq-list space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border-b border-white/20 pb-4"
            >
              {/* FAQ Number */}
              <div className="faq-number text-[16px] text-[var(--color-accent)] font-semibold">
                ({String(index + 1).padStart(2, "0")})
              </div>

              {/* FAQ Question */}
              <div
                className="faq-question text-lg font-semibold cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
              </div>

              {/* FAQ Answer (Accordion Toggle) */}
              {activeIndex === index && (
                <div className="faq-answer text-sm text-gray-200 mt-3">
                  {faq.answers}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
