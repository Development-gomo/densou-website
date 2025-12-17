// src/app/[lang]/layout.jsx
import Footer from "@/components/major/Footer";

export const dynamicParams = true;

export default function LangLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
