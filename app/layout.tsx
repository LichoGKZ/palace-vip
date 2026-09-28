import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import MetaPixel from "./MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // habilita env(safe-area-inset-*) en iOS
  colorScheme: "dark",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Palace",
  description: "Mas que contenido",
  other: {
    "facebook-domain-verification": "ie4mj0zf35uo1zv8siv5bq7xwe4uxn",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={geistSans.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
