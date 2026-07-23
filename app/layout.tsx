import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "TST — The Street Talks | Coming Soon", description: "A New Voice Is Coming. Born in Zimbabwe. Built for the World." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Inter:wght@400;600&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-luxury-black text-white">{children}</body>
    </html>
  );
}