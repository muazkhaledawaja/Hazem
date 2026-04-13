import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Hazem — Advertising Specialist, Filmmaker & Brand Consultant",
  description:
    "Portfolio of Mohamed Hazem — a Mass Communication professional specializing in advertising, filmmaking, video editing, and brand development based in Cairo, Egypt.",
  keywords: [
    "Mohamed Hazem",
    "advertising",
    "filmmaker",
    "brand consultant",
    "video editor",
    "Cairo",
    "portfolio",
    "mass communication",
  ],
  openGraph: {
    title: "Mohamed Hazem — Portfolio",
    description: "Inspiring Brands through Storytelling & Strategy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Hazem — Portfolio",
    description: "Inspiring Brands through Storytelling & Strategy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
