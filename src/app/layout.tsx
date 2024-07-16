import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "@/components/Footer";
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evan J. Washington",
  description: "Portfolio and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
          {children}
          </main>
          <Footer />
        </div>
        </Provider>
      </body>
    </html>
  );
}
