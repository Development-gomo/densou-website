"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CoreValueSection({ data }) {
  const { sub_heading, core_value = [] } = data || {};
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!core_value.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === core_value.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [core_value.length]);

  if (!core_value.length) return null;

  const activeItem = core_value[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#151B5D] py-32 text-white">
      <div className="mx-auto max-w-[1300px] px-4">
        {/* Sub heading */}
        {sub_heading && (
          <p className="mb-10 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[#00F5C4]" />
            {sub_heading}
          </p>
        )}

        {/* Marquee-like scroll */}
        <div className="relative mb-16">
          <motion.div
            key={activeItem.heading}
            className="marquee-wrapper"
            animate={{
              x: [-1000, 0],
            }}
            transition={{
              duration: 4,
              ease: "linear",
              loop: Infinity,
            }}
          >
            <h2 className="text-[clamp(3rem,12vw,9rem)] font-medium uppercase leading-none text-[#00F5C4]">
              {activeItem.heading}
            </h2>
          </motion.div>

          {/* Ghost word (background) */}
          <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none text-[clamp(3rem,12vw,9rem)] font-medium uppercase text-white/10 lg:block">
            {core_value[(activeIndex + 1) % core_value.length]?.heading}
          </div>
        </div>

        {/* Description */}
        <div className="max-w-xl">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-sm text-[#00F5C4]">
              ({String(activeIndex + 1).padStart(2, "0")})
            </p>

            <p className="text-base leading-relaxed text-white/80">
              {activeItem.text_area}
            </p>
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="mt-12 flex gap-3">
          {core_value.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-3 w-3 rounded-full border transition ${
                i === activeIndex
                  ? "border-[#00F5C4] bg-[#00F5C4]"
                  : "border-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
