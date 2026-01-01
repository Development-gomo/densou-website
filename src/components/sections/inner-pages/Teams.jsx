"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  getAllTeam,
  buildTeamFilters,
  filterTeamByType,
  getTeamImage,
} from "@/lib/wp";

export default function TeamSection({ data, lang }) {
  const [team, setTeam] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function loadTeam() {
      const res = await getAllTeam(lang);
      if (!Array.isArray(res)) return;

      setTeam(res);
      setFilters(buildTeamFilters(res));
    }

    loadTeam();
  }, [lang]);

  const filteredTeam = filterTeamByType(team, activeFilter);

  const {
    sub_heading,
    heading,
    short_text,
    team_cards,
  } = data || {};

  if (team_cards === "Disable") return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1300px] px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          {sub_heading && (
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-3">
              {sub_heading}
            </p>
          )}

          {heading && (
            <h2 className="text-4xl font-medium mb-4">
              {heading}
            </h2>
          )}

          {short_text && (
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: short_text }}
            />
          )}
        </div>

        {/* Filter */}
        <div className="mb-10">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="min-w-[260px] rounded-md border border-gray-300 px-4 py-2 text-sm"
          >
            {filters.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredTeam.map((member) => {
            const image = getTeamImage(member);

            return (
              <div
                key={member.id}
                className="relative overflow-hidden rounded-xl bg-gray-100"
              >
                {/* Image */}
                <div className="relative aspect-[3/4]">
                  {image && (
                    <Image
                      src={image}
                      alt={member.title.rendered}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 text-white">
                  <p className="font-medium">
                    {member.title.rendered}
                  </p>
                  <p className="text-sm opacity-80">
                    {member?.acf?.job_title}
                  </p>
                </div>

                {/* Email */}
                {member?.acf?.email && (
                  <a
                    href={`mailto:${member.acf.email}`}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#1c2a7a] text-white transition hover:opacity-90"
                    aria-label="Email"
                  >
                    ✉
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
