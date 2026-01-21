// src/app/[lang]/layout.jsx

export const dynamicParams = true;

export default function LangLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
