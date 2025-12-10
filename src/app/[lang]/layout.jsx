// src/app/[lang]/layout.jsx
import Footer from "@/components/major/Footer";
import { Instrument_Sans, Tinos } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tinos",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "da" }];
}

export default async function LangLayout({ children, params }) {
  const resolved = await params;
  const parsed =
    typeof resolved === "string"
      ? JSON.parse(resolved)
      : typeof resolved?.value === "string"
      ? JSON.parse(resolved.value)
      : resolved;

  const lang = parsed?.lang || "en";

  return (
    <html
      lang={lang}
      className={`${instrumentSans.variable} ${tinos.variable}`}
    >
      <body>
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
