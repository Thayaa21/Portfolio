import type { Metadata } from "next";
import "./globals.css";
import { satoshi, inter, geistMono } from "./fonts";
import { Background } from "@/components/layout/Background";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { identity, hero } from "@/content/site";
import { resumeExists, siteUrl } from "@/lib/utils";

const description = hero.subhead;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Thayaananthan Kanagaraj: AI Engineer",
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Thayaananthan Kanagaraj: AI Engineer",
    description,
    siteName: "Thayaananthan Kanagaraj",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Thayaananthan Kanagaraj: AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thayaananthan Kanagaraj: AI Engineer",
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: "AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "qBotica",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Arizona State University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Sri Ramakrishna Engineering College",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tempe",
    addressRegion: "AZ",
    addressCountry: "US",
  },
  email: `mailto:${identity.email}`,
  url: siteUrl,
  sameAs: [identity.github, identity.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hasResume = resumeExists();
  return (
    <html lang="en" className={`${satoshi.variable} ${inter.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <ScrollProgress />
          <Background />
          <Nav hasResume={hasResume} />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
