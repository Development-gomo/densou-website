"use client";

import { motion } from "framer-motion";

export default function StorySection({ data }) {
  if (!data) return null;

  const {
    sub_heading,
    heading,
    short_text,
    quote_text,
    quote_citation,
  } = data;

  return (
    <section className="py-12 md:py-30 web-width px-6">
      {/* Subheading */}
      {sub_heading && (
        <div className="flex items-center gap-2 mb-2 md:mb-4">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
          <span className="subheading-label uppercase">{sub_heading}</span>
        </div>
      )}

      {/* Heading */}
      {heading && (
        <div
          className="section-heading mb-6 md:mb-13 max-w-[820px]"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      )}

      {/* Content: Story */}
      <div className="flex flex-col md:flex-row md:gap-12">
        {/* Left Column: Story Text */}
        <div className="lg:w-[55%] space-y-6 text-sm text-gray-500">
          {short_text && (
            <div
              className="body-text max-w-[520px] mb-6"
              dangerouslySetInnerHTML={{ __html: short_text }}
            />
          )}
        </div>

        {/* Right Column: Quote */}
        <div className="lg:w-[45%] mt-6 lg:mt-0">
          {quote_text && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#00F5C4] text-white rounded-xl p-8 space-y-4"
            >
              <p className="text-lg italic">“{quote_text}”</p>
              {quote_citation && (
                <p className="text-sm text-gray-900 font-semibold">{quote_citation}</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
