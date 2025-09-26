import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import JsonLd from "./components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://on-insight.netlify.app/'),
  title: "O(n) Insight - Analizador de Complejidad Algorítmica",
  description: "Análisis inteligente de complejidad Big-O para código Java en tiempo real. Detecta automáticamente algoritmos como MergeSort, QuickSort, Fibonacci y más con visualización interactiva.",
  keywords: [
    "algoritmos",
    "complejidad algorítmica", 
    "Big-O",
    "análisis de código",
    "Java",
    "programación",
    "visualización",
    "MergeSort",
    "QuickSort",
    "Fibonacci",
    "educación",
    "desarrollo de software"
  ],
  authors: [{ name: "Fabian" }],
  creator: "Fabian",
  publisher: "Fabian",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Open Graph para redes sociales
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://on-insight.netlify.app/",
    title: "O(n) Insight - Analizador de Complejidad Algorítmica",
    description: "Análisis inteligente de complejidad Big-O para código Java en tiempo real. Detecta automáticamente algoritmos con visualización interactiva.",
    siteName: "O(n) Insight",
    images: [
      {
        url: "https://on-insight.netlify.app/capture.png",
        width: 1200,
        height: 630,
        alt: "O(n) Insight - Interfaz del analizador de complejidad algorítmica",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@on_insight",
    creator: "@on_insight", 
    title: "O(n) Insight - Analizador de Complejidad Algorítmica",
    description: "Análisis inteligente de complejidad Big-O para código Java en tiempo real con visualización interactiva.",
    images: ["https://on-insight.netlify.app/capture.png"],
  },
  
  // Configuración adicional para móviles
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "O(n) Insight",
  },
  
  // Manifest para PWA
  manifest: "/manifest.json",
  
  // Icons
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/logo.png"],
  },
  
  // Configuración adicional
  category: "education",
  classification: "Educational Tool",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Meta tags adicionales para SEO */}
        <meta name="theme-color" content="#1E1E1E" />
        <meta name="msapplication-TileColor" content="#1E1E1E" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
