import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import 'react-international-phone/style.css';
import { Toaster } from "@/components/ui/toaster";
import '@/lib/statusCronJob';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaustubha MedTech",
  description: "",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="preload" href="/_next/static/media/a34f9d1faa5f3315-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={inter.className}>
        < Toaster />
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
