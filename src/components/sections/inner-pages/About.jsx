// src/components/sections/About.jsx
import React from "react";
import Image from "next/image";

export default function AboutUs({ data }) {
  const { sub_heading, heading, short_text, cta_text, cta_url, image } = data;

  return (
    <section  className="py-20 bg-white"> 
      <div className="web-width grid md:grid-cols-2 gap-10 items-center">
        <div>
          {sub_heading && (
            <p className="text-sm uppercase mb-2 text-gray-500">
              {sub_heading}
            </p>
          )}
          {heading && (
            <div
              className="text-3xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}
          {short_text && (
            <div
              className="text-gray-600 mb-6"
              dangerouslySetInnerHTML={{ __html: short_text }}
            />
          )}
          {cta_text && (
            <a
              href={cta_url || "#"}
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              {cta_text}
            </a>
          )}
        </div>
        {image?.url && (
          <div className="flex justify-center">
            <Image
              src={image.url}
              alt={sub_heading || "About Us"}
              width={600}
              height={400}
              className="rounded-xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}