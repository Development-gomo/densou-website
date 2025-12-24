"use client";

import Image from "next/image";
import React from "react";
import DownArrow from "../../../../public/hero-down-arrow.png";
import { motion } from "framer-motion";

export default function InnerHero({ data }) {
  const bgImage = data?.bg_image?.url || "";
  const heading = data?.heading || "";
  const sub_heading = data?.sub_heading || "";


  return (
    <section id="inner-hero" className="relative w-full  overflow-hidden hero">
      {/* BG IMAGE/VIDEO */}
      <div className="absolute inset-0 -z-10">
        {bgImage &&  
          <Image
            src={bgImage}
            alt="Hero Background"

            fill
            className="object-cover"
            priority
          />
        }
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/70 -z-10"></div>

      {/* HERO TEXT */}
      <div className="relative min-h-[100vh] web-width px-6 py-24 lg:py-20 h-full flex flex-col items-start  justify-end">
        <div className="">
          {sub_heading && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="uppercase subheading-label text-[var(--color-accent)]"
              dangerouslySetInnerHTML={{ __html: sub_heading }}
            />
          )}

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-xl text-white"
            dangerouslySetInnerHTML={{
              __html: heading.replace(/<em>(.*?)<\/em>/g, `<em>$1</em>`),
            }}
          />
  
            <motion.a
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#next")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-5 w-12 h-12 rounded-full bg-[var(--color-accent)] translate-y-0 transition-all duration-300
                flex items-center justify-center shadow-md hover:translate-y-[6px] cursor-pointer"
            >
              <Image src={DownArrow} alt="arrow" width={13} height={13} />
            </motion.a>
        </div>
      </div>
    </section>
  );
}
