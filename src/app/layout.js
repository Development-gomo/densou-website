import "./globals.css";
import { Instrument_Sans, Tinos } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600" , "700"],
  variable: "--font-instrument-sans",
  style: ["normal", "italic"], 
  display: "swap",
});

const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tinos",
  style: ["normal", "italic"], 
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${tinos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
