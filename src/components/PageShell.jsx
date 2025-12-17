import Header from "@/components/major/Header";
import Footer from "@/components/major/Footer";

export default function PageShell({ lang, slug, children }) {
  return (
    <>
      <Header lang={lang} currentSlug={slug} />
        <main>{children}</main>
      <Footer lang={lang} />
    </>
  );
}
