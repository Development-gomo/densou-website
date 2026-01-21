// src/app/[lang]/post/[slug]/page.jsx

import Header from "@/components/major/Header";
import PageBuilder from "@/components/major/PageBuilder";
import Footer from "@/components/major/Footer";
import { resolveParams } from "@/lib/params";
import { getPostBySlug, getMediaById } from "@/lib/api";
import { buildMetadataFromYoast } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DEFAULT_LANG } from "@/config";

/* ---------------------------------------------------------
   COMPONENT: PostBody
--------------------------------------------------------- */
function PostBody({ entry, lang }) {
  const sections = entry?.acf?.page_builder;
  const contentHtml = entry?.content?.rendered;

  // If ACF flexible content is available → render PageBuilder
  if (Array.isArray(sections) && sections.length > 0) {
    return <PageBuilder sections={sections} lang={lang} />;
  }

  // If WordPress default content exists → show it
  if (contentHtml) {
    return (
      <div
        className="max-w-3xl mx-auto [&>p]:mb-6"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    );
  }

  // Fallback message
  return (
    <p className="text-center text-gray-500">
      Content will be available soon.
    </p>
  );
}

/* ---------------------------------------------------------
   MAIN PAGE
--------------------------------------------------------- */
export default async function postSinglePage({ params }) {
  const parsed = resolveParams(await params);
  const lang = parsed?.lang || DEFAULT_LANG;
  const slug = parsed?.slug;

  if (!slug) notFound();

  const post = await getPostBySlug(slug, lang);
  if (!post) notFound();

  // Get the featured image
  const featuredMedia = await getMediaById(post.featured_media);

  const heroImage =
    featuredMedia?.media_details?.sizes?.full?.source_url ||
    featuredMedia?.source_url ||
    null;

  return (
    <>
      <Header
        lang={lang}
        currentSlug={slug}
        entryType="post"
        pathPrefix="post"
        entryId={post?.id}
      />
      <div className="h-[112px] w-full bg-black"></div> 
      <main className="px-4 py-15 space-y-8">
        <article className="max-w-4xl mx-auto space-y-6">

          {/* TITLE */}
          {post?.title?.rendered && (
            <h1
              className="text-4xl font-semibold text-center"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          )}

          {/* EXCERPT */}
          {/* {post?.excerpt?.rendered && (
            <div
              className="text-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          )} */}

          {/* HERO IMAGE */}
          {heroImage && (
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
              <Image
                src={heroImage}
                alt={post?.title?.rendered || "Post hero image"}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
              />
            </div>
          )}

          {/* BODY CONTENT (ACF OR WYSIWYG) */}
          <PostBody entry={post} lang={lang} />
        </article>
      </main>
      <Footer lang={lang} currentSlug={slug} />
    </>
  );
}

/* ---------------------------------------------------------
   METADATA (Yoast SEO)
--------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const parsed = resolveParams(await params);
  const lang = parsed?.lang || DEFAULT_LANG;
  const slug = parsed?.slug;

  if (!slug) {
    return {
      title: "Post | Densou",
    };
  }

  const post = await getPostBySlug(slug, lang);

  return buildMetadataFromYoast(post, {
    fallbackTitle: `${slug} | Densou`,
    lang,
  });
}
