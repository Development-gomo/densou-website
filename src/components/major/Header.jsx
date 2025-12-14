// src/components/major/Header.jsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "../../../public/right-arrow.svg";
import DownSvg from "../../../public/down-arrow.svg";
import ArrowSvgB from "../../../public/right-arrow-black.png";
import {getMenu, getThemeOptions, getTranslationBySlug} from "@/lib/api";


export default function Header({ lang = "en", currentSlug = "" }) {
  const [menu, setMenu] = useState(null);
  const [options, setOptions] = useState(null);
  const [altLangUrl, setAltLangUrl] = useState(`/${lang === "en" ? "da" : "en"}`);
  const [scrolled, setScrolled] = useState(false);
  const isLoading = !menu;
  const isHeaderLoading = !menu || !options;


  // Fetch menu + theme options client-side
  useEffect(() => {
    async function loadData() {
      const [menuData, themeOptions] = await Promise.all([
        getMenu(lang),
        getThemeOptions(lang),
      ]);
      setMenu(menuData);
      setOptions(themeOptions?.header || {});
    }
    loadData();
  }, [lang]);

  // scroll listener for sticky animation
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Sticky header classes
  const headerClasses =
    scrolled
      ? "fixed top-0 w-full z-50 text-white transition-all duration-300  py-4 bg-[var(--color-brand)] shadow-md"
      : "fixed top-0 w-full z-50 text-white transition-all duration-300 bg-transparent  py-8";

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function fetchAltLangUrl() {
      try {
        const altLang = lang === "en" ? "da" : "en";
        const translation = await getTranslationBySlug(currentSlug, lang, altLang);
        if (translation?.slug) {
          setAltLangUrl(`/${altLang}/${translation.slug}`);
        }
      } catch (error) {
        console.error("Failed to fetch translation:", error);
      }
    }

    if (currentSlug) {
      fetchAltLangUrl();
    }
  }, [lang, currentSlug]);

  return (
    <header className={headerClasses}>
      <div className="web-width mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link href={`/${lang}`} className="flex relative h-[32px] w-[100px] md:h-[40px] md:w-[100px]">
          {options?.logo_light?.url && (
            <Image
              src={options.logo_light.url}
              alt="Densou Logo"
              width={100}
              height={16}
              className="object-contain"
              priority
            />
          )}
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 ">
          {/* Centered glass menu wrapper */}
            <div className="
              backdrop-blur-xl bg-white/20 
              px-8 py-4 rounded-full shadow-lg 
              flex items-center gap-8 lg:absolute lg:left-1/3
            ">
              <ul className="flex items-center gap-9 relative">
                  {isLoading ? (
                    // SKELETON MENU (no jump)
                    <>
                      {[1,2,3,4,5].map(i => (
                        <li
                          key={"sk-"+i}
                          className="w-[80px] h-[18px] rounded-full bg-white/30 animate-pulse"
                        />
                      ))}
                    </>
                  ) : (
                    // REAL MENU
                    menu.main.map((item) => (
                      <li key={item.id} className="relative group">

                        <Link
                          href={item.url.startsWith("/") ? `/${lang}${item.url}` : item.url}
                          className="
                            text-white/90 text-[15px] font-medium
                            hover:text-white transition flex items-center gap-2
                          "
                        >
                          {item.title}

                          {item.children?.length > 0 && (
                            <span className="transition-transform duration-300 group-hover:rotate-180">
                              <Image src={DownSvg} alt="arrow" width={13} height={13} />
                            </span>
                          )}
                        </Link>

                        {/* SUBMENU */}
                        {item.children?.length > 0 && (
                          <ul className="
                            absolute left-1/2 top-[20px] mt-1 
                            -translate-x-1/2 min-w-[180px]
                            backdrop-blur-xl bg-white/20
                            rounded-xl py-2 shadow-lg
                            opacity-0 pointer-events-none
                            group-hover:opacity-100 group-hover:pointer-events-auto
                            transition-all duration-300
                            z-[200]
                          ">
                            {item.children.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={sub.url.startsWith("/") ? `/${lang}${sub.url}` : sub.url}
                                  className="
                                    block px-3 py-2 text-white/90 text-sm
                                    hover:text-white hover:bg-white/10 transition
                                  "
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}

                      </li>
                    ))
                  )}

                </ul>

            </div>


          {/* Language Switcher */}
          <Link
            href={altLangUrl}
            className="text-white/70 hover:text-white text-sm font-semibold"
          >
            {lang === "en" ? "DA" : "EN"}
          </Link>
          
          {/* CTA BUTTON */}
              {(!options?.button_text || !options?.button_url) ? (
                
                // SKELETON PLACEHOLDER (prevents jump)
                <div className="w-[135px] h-[42px] rounded-sm bg-white/20 animate-pulse"></div>

              ) : (

                // REAL BUTTON (unchanged HTML as requested)
                <Link
                  href={
                    options.button_url.startsWith("/")
                      ? `/${lang}${options.button_url}`
                      : options.button_url
                  }
                  className={`gap-3 group relative inline-flex items-center select-none 
                    rounded-sm px-6 py-4 text-white 
                    transition-all duration-300  
                    w-[150px] overflow-hidden
                      ${scrolled ? "bg-[var(--color-accent)]" : "bg-[var(--color-brand)]"}`}>

                  {/* LEFT SLOT (dot area, fixed width) */}
                  <span className="relative w-6 flex items-center justify-center">
                    <span
                      className={`
                        absolute h-2 w-2 rounded-full
                        transition-all duration-300 ease-out
                        group-hover:opacity-0 group-hover:-translate-x-1
                         ${scrolled ? "bg-[var(--color-brand)]" : "bg-[var(--color-accent)]"}`}></span>
                  </span>

                  {/* TEXT (slides left on hover) */}
                  <span
                      className={`
                      flex-1 text-[16px] leading-none
                      transition-all duration-300 ease-out 
                      group-hover:-translate-x-4
                      whitespace-nowrap
                      ${scrolled ? "text-[var(--color-brand)]" : "text-white"}`}>
                    {options.button_text}
                  </span>

                  {/* RIGHT SLOT (arrow area, fixed width) */}
                  <span className="relative w-4 flex items-center justify-center">
                    <span
                      className="
                        w-4 absolute text-[16px]
                        opacity-0 -translate-x-4
                        transition-all duration-300 ease-out
                        group-hover:opacity-100 group-hover:-translate-x-2
                      "
                    >
                      {scrolled ? <Image src={ArrowSvgB} alt="arrow" width={13} height={13} /> : <Image src={ArrowSvg} alt="arrow" width={13} height={13} />}
                      
                    </span>
                  </span>
                </Link>
              )} 
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 min-h-screen w-72 bg-[var(--color-brand)] p-6 shadow-xl">

            {/* Close */}
            <button
              className="text-white text-3xl mb-6"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>

            {/* Menu Items */}
            <div className="flex flex-col gap-5">
              {menu?.main?.map((item) => (
                <Link
                  key={item.id}
                  href={item.url.startsWith("/") ? `/${lang}${item.url}` : item.url}
                  className="text-white text-lg hover:text-white/70 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              {/* CTA BUTTON */}
              {options?.button_text && (
                <Link
                  href={options.button_url}
                  className="mt-4 inline-block text-center rounded-lg bg-white text-[#151B5D] px-5 py-3 font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  {options.button_text}
                </Link>
              )}

              {/* Language Switcher */}
              <Link
                href={altLangUrl}
                className="mt-6 text-white/80 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {lang === "en" ? "DA" : "EN"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
