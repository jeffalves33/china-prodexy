import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prodexy",
  description: "Sistema de gestão para rede de escolas gerais",
  generator: "Prodexy labs",
  applicationName: "Prodexy",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prodexy",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        url: "/logo.png",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
    apple: "/logo.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#111111",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
