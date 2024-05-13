import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onena Hire",
  description: "Hire The Best, Fast",
  openGraph: {
    images:
      "https://res.cloudinary.com/f00rd/image/upload/v1715580825/onenahire/bmjb6eqxknnwx4fza2uv.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@onenahq",
    creator: "@onenahq",
    images:
      "https://res.cloudinary.com/f00rd/image/upload/v1715580825/onenahire/bmjb6eqxknnwx4fza2uv.png",
  },
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
