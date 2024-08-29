import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Provider from "@/components/provider";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { cookieToInitialState } from "wagmi";
import { config } from "@/lib/config/wagmi";
import { headers } from "next/headers";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Learn Web3",
  description: "learn web3 with me --diar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider initialState={initialState}>
          <Toaster />
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
