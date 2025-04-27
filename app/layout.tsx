import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Student Panel",
  description: "A clean student panel UI",
    generator: 'MAIT'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <header className="bg-blue-700 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">University Student Panel</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
