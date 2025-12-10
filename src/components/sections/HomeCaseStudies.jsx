// src/components/sections/HomeCaseStudies.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ArrowSvg from "../../../public/right-arrow.svg";
import NavArrow from "../../../public/nav-arrow.svg";
import NavHover from "../../../public/nav-hover-arrow.svg";
import ArrowSvgB from "../../../public/right-arrow-black.png";
import CheckSvg from "../../../public/check.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { getCaseStudies } from "@/lib/wp";

export default function HomeCaseStudies({ data, lang = "en" }) {
  const [cases, setCases] = useState([]);

  const { sub_heading, heading, cta_text, cta_url, read_more_text } =
    data || {};

  useEffect(() => {
    async function load() {
      const list = await getCaseStudies(lang);
      setCases(list || []);
    }
    load();
  }, [lang]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const btn = document.querySelector(".case-next-btn");
      if (btn) {
        btn.click();
        clearInterval(interval); // Prevent repeated clicks
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);


  if (!cases.length) return null;

  return (
    <section className="pt-12 md:pt-20">
      {/* FULL WIDTH WRAPPER */}
      <div className="w-full px-6 web-width">
        {/* SUB HEADING */}
        {sub_heading && (
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#00FEC3]"></span>
            <span className="subheading-label">{sub_heading}</span>
          </div>
        )}

        {/* TOP HEADING + CTA */}
        <div className="md:flex md:justify-between items-end mb-12">
          <div
            className="section-heading mb-4 md:mb-0"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {cta_text && cta_url && (
            <Link
              href={cta_url.startsWith("/") ? `/${lang}${cta_url}` : cta_url}
              className="
              gap-3 group relative inline-flex items-center
              rounded-sm bg-[#151B5D] px-6 py-4 text-white
              transition-all duration-300 hover:bg-[#151B5D]
              w-[160px] overflow-hidden select-none
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
      <div className="w-full">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".case-next-btn",
            prevEl: ".case-prev-btn",
          }}
          slidesPerView={1.5}
          spaceBetween={30}
          centeredSlides={true} 
          breakpoints={{
            280: { slidesPerView: 1.1 },
            510: { slidesPerView: 1.1 },
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 1.5 },
            1280: { slidesPerView: 1.4 },
            1536: { slidesPerView: 1.4 },
          }}
        >
          {cases.map((item) => {
            const img = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
            const clientLogo = item?.acf?.client_logo?.url || "";
            const sliderData = item?.acf?.slider_card_data || [];
            const title = item?.title?.rendered || "";
            const section_label = item?.acf?.section_label || "";

            return (
              <SwiperSlide key={item.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-[#151B5D] text-white min-h-[400px]  p-6 lg:p-12 flex flex-col justify-center">
                    <h3
                      className="text-[24px] leading-[32px] md:text-[32px] lg:leading-[40px]"
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <Link
                      href={`/${lang}/case-study/${item.slug}`}
                      className=" mt-8
                      gap-3 group relative inline-flex items-center
                      rounded-sm bg-[#00FEC3] px-6 py-4 text-white
                      transition-all duration-300 hover:bg-[#00FEC3]
                      w-[155px] overflow-hidden select-none mb-15">
                      {/* LEFT DOT */}
                      <span className="relative w-6 flex items-center justify-center">
                        <span className="
                          absolute h-2 w-2 rounded-full bg-[#191F68]
                          transition-all duration-300 ease-out
                          group-hover:opacity-0 group-hover:-translate-x-1"></span>
                      </span>

                      {/* TEXT */}
                      <span className="text-black 
                        flex-1 text-[16px] leading-none
                        transition-all duration-300 ease-out
                        group-hover:-translate-x-4
                        whitespace-nowrap">
                        {read_more_text}
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
                          <Image
                            src={ArrowSvgB}
                            width={13}
                            height={13}
                            alt="arrow"
                          />
                        </span>
                      </span>
                    </Link>

                    {/* Achievements */}
                    {sliderData?.length > 0 && (
                      <>
                        <p className="mb-3 text-[18px]">{section_label}</p>
                        <div className="flex- gap-3">
                          {sliderData.map((row, i) => (
                            <span key={i} className="inline-block mb-3">
                              <span className="flex text-xs items-center justify- border border-white rounded-lg">
                              <span className="flex items-center p-2 gap-2 min-w-[175px]">
                                <span className="h-[24px] w-[24px] bg-[#ffffff40] flex items-center justify-center rounded-full">
                                  <Image src={CheckSvg} width={9} height={8} alt="no-follow" />
                                </span>
                                <span className="text-xs">
                                  {row.what_we_achieve}
                                </span>
                              </span>
                              <span className="w-[50px] text-center px-4 py-3 text-xs border-l font-semibold">
                                {row.stats}
                              </span>
                            </span>
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="relative h-[350px] lg:h-[500px]">
                    {img && (
                      <Image
                        src={img}
                        fill
                        alt={title}
                        className="object-cover"
                      />
                    )}

                    {/* CLIENT LOGO */}
                    {clientLogo && (
                      <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-xl px-5 py-2 rounded-md">
                        <Image
                          src={clientLogo}
                          alt="client logo"
                          width={100}
                          height={40}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* NAV BUTTONS */}
        <div className="flex justify-center gap-4 mt-8 lg:mt-10">
          <button className="cursor-pointer case-prev-btn w-10 h-10 rounded-md border border-gray-300 bg-white/40 group flex items-center justify-center hover:bg-[#9192A0]">
            <Image
              src={NavHover}
              width={16}
              height={16}
              alt="prev"
              className="block group-hover:hidden"
            />
            <Image
              src={NavArrow}
              width={16}
              height={16}
              alt="prev"
              className="hidden group-hover:block rotate-180"
            />
          </button>

          <button className="cursor-pointer case-next-btn w-10 h-10 rounded-md border border-gray-300 group flex items-center justify-center hover:bg-[#9192A0]">
            <Image
              src={NavHover}
              width={16}
              height={16}
              alt="next"
              className="block group-hover:hidden rotate-180"
            />
            <Image
              src={NavArrow}
              width={16}
              height={16}
              alt="next"
              className="hidden group-hover:block"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
