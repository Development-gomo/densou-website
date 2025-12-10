// src/app/layout.js

import "./globals.css";

export const metadata = {
  title: "Densou",
  description: "Headless WordPress + Next.js + WPML",
};

// Global wrapper: no <html> or <body> here
export default function RootLayout({ children }) {
  return children;
}