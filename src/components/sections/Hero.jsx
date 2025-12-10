// src/components/sections/Hero.jsx
import React from "react";
import Image from "next/image";

export default function Hero({ data }) {
  const { heading, short_heading, bg_image, bg_video, cta_text, cta_url } = data;

  return (
    <section className="relative h-screen flex flex-col justify-center text-center text-white">
      {bg_video?.url ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bg_video.url}
          autoPlay
          muted
          loop
        />
      ) : (
        bg_image?.url && (
          <Image
            src={bg_image.url}
            alt={ short_heading || ""}
            fill
            className="object-cover"
            priority
          />
        )
      )}

      <div className="relative z-10 max-w-3xl mx-auto">
        {heading && (
          <div
            className="mb-4 text-lg"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}
        {short_heading && (
          <div
            className="mb-4 text-lg"
            dangerouslySetInnerHTML={{ __html: short_heading }}
          />
        )}
        
        {cta_text && (
          <a
            href={cta_url || "#"}
            className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
          >
            {cta_text}
          </a>
        )}
      </div>
      <div className="absolute inset-0 transparent linear-gradient(180deg, #00000050 0%, #000000 100%)" />
    </section>
  );
}