import { Providers } from "@/components/providers"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type React from "react"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Burger House - Hambúrgueres Artesanais | Delivery e Cardápio Digital",
    template: "%s | Burger House",
  },
  description:
    "Os melhores hambúrgueres artesanais da cidade. Ingredientes premium, entrega rápida em 30min. Confira nosso cardápio digital e peça já!",
  keywords: [
    "hambúrguer artesanal",
    "burger",
    "delivery",
    "fast food",
    "comida americana",
    "hambúrguer gourmet",
    "lanchonete",
  ],
  authors: [{ name: "Burger House" }],
  creator: "Burger House",
  publisher: "Burger House",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Burger House - Hambúrgueres Artesanais",
    description: "Os melhores hambúrgueres artesanais da cidade. Ingredientes premium, entrega rápida em 30min.",
    siteName: "Burger House",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Burger House - Hambúrgueres Artesanais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Burger House - Hambúrgueres Artesanais",
    description: "Os melhores hambúrgueres artesanais da cidade. Ingredientes premium, entrega rápida em 30min.",
    images: ["/og-image.jpg"],
  },
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
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#a85a32" },
    { media: "(prefers-color-scheme: dark)", color: "#d67846" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
