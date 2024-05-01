import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DUNI",
  description: "Movies Scheduling",
};

interface RootLayoutProps{
  children: React.ReactNode;
  params : {
    locale : string;
  }
}

export default function RootLayout({
  children,
  params: {locale},
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale} className="bg-back">
      <body className={inter.className}>
        <div className="max-w-screen-sm mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
