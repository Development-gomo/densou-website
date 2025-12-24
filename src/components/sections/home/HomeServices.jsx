// src/components/sections/HomeServices.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "../../../../public/right-arrow.svg";
import NavArrow from "../../../../public/nav-arrow.svg";
import NavHover from "../../../../public/nav-hover-arrow.svg";
import { DEFAULT_LANG } from "@/config";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { getAllServices } from "@/lib/wp";

export default function HomeServices({ data, lang = DEFAULT_LANG }) {
  const [services, setServices] = useState([]);

  // Extract ACF values cleanly
  const {
    sub_heading,
    heading,
    cta_text,
    cta_url,
  } = data || {};

  // Fetch translated services
  useEffect(() => {
    async function load() {
      const list = await getAllServices(lang);
      setServices(list || []);
    }
    load();
  }, [lang]); 

  useEffect(() => {
    const interval = setInterval(() => {
    const btn = document.querySelector(".next-btn");
      if (btn) {
        btn.click();
        clearInterval(interval); // Prevent repeated clicks
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);


  if (!services.length) return null;

  return (
    <section id="services-section" className="py-12 md:py-30">
      {/* FULL WIDTH WRAPPER */}
      <div className="w-full px-6 web-width">

      {/* SUB HEADING */}
      {sub_heading && (
        <div className="flex items-center gap-2 mb-2 md:mb-4">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
          <span className="subheading-label">{sub_heading}</span>
        </div>
      )}

      {/* TOP ROW: HEADING + CTA */}
      <div className="lg:flex lg:justify-between items-end items-end mb-10 lg:mb-14">
        <div
          className="section-heading mb-4 md:mb-0"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        {/* CTA BUTTON */}
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
              rounded-sm bg-[var(--color-brand)] px-6 py-4 text-white
              transition-all duration-300 hover:bg-[var(--color-brand)]
              w-[235px] overflow-hidden select-none
            "
          >

            {/* LEFT DOT */}
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

      {/* FULL WIDTH SLIDER */}
      <div className="w-full py-6 lg:py-0">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        slidesPerView={3}
        spaceBetween={24}
        centeredSlides={true} 
        breakpoints={{
          320: { slidesPerView: 1.1 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.1 },
          1280: { slidesPerView: 3.7 },
        }}
      >
        {services.map((service) => {
          const img =
            service?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            service?.acf?.featured_image?.url ||
            "";

          const excerpt = (service?.excerpt?.rendered || "");
          const service_icon = service?.acf?.service_icon?.url || "";

          return (
            <SwiperSlide key={service.id}>
              <Link
                href={
                  lang === "en"
                    ? `/service/${service.slug}`
                    : `/${lang}/service/${service.slug}`
                }
                className="block group rounded-[8px] overflow-hidden relative"
              >
                {img && (
                  <Image
                    src={img}
                    alt={service.title.rendered}
                    width={410}
                    height={500}
                    className="w-full h-[500px] object-cover transition-all duration-500 group-hover:scale-105"
                  />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                {/* LABEL BADGE */}
                <div className="absolute top-6 left-6">
                  <span className="
                    bg-white/20 backdrop-blur-xl text-white px-6 py-4
                    rounded-full flex items-center gap-2 text-sm
                  ">
                     {service_icon && (
                      <Image
                        src={service_icon}
                        alt={service.title.rendered}
                        width={24}
                        height={24}
                        className=""
                      />
                    )}
                    {service.title.rendered}
                  </span>
                </div>

                {/* ARROW TOP RIGHT */}
                <div className="absolute top-6 right-8 transition-all duration-300 group-hover:right-6">
                  <div className="
                    w-13 h-13 rounded-full bg-[var(--color-brand)]
                    flex items-center justify-center
                    transition-all duration-300
                  ">
                    <Image src={ArrowSvg} width={16} height={16} alt="go" />
                  </div>
                </div>

                {/* EXCERPT */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white text-[24px] lg:text-[30px]" dangerouslySetInnerHTML={{ __html: excerpt  }} />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-center gap-4 mt-8 lg:mt-10">
        {/* PREV */}
        <button className="cursor-pointer  prev-btn w-12 h-12 rounded-md border border-gray-300 group flex items-center justify-center bg-white/40 hover:bg-[#9192A0]">
          <Image src={NavHover} width={12} height={12} alt="prev"
                 className="block transition-all duration-300 group-hover:hidden" />
          <Image src={NavArrow} width={12} height={12} alt="prev"
                 className="hidden transition-all duration-300 group-hover:block rotate-180" />
        </button>

        {/* NEXT */}
        <button className="cursor-pointer next-btn w-12 h-12 rounded-md border border-gray-300 group flex items-center justify-center hover:bg-[#9192A0] text-white">
          <Image src={NavHover} width={12} height={12} alt="next"
                 className="block transition-all duration-300 group-hover:hidden rotate-180" />
          <Image src={NavArrow} width={12} height={16} alt="next"
                 className="hidden transition-all duration-300 group-hover:block" />
        </button>
      </div>
    </div>
    </section>
  );
}
