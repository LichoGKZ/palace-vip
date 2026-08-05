import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MetaPixel from "./MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palace",
  description: "Mas que contenido",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Script id="error-shield" strategy="beforeInteractive">
          {`
            window.addEventListener('error', function(e) {
              e.stopImmediatePropagation();
            }, true);
          `}
        </Script>

        <MetaPixel />

        {children}
      </body>
    </html>
  );
}