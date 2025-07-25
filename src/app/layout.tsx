"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Providers } from "@/redux/Provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Providers>
          <Toaster position="top-right" />
            {children}
          </Providers>
        </LocalizationProvider>
      </body>
    </html>
  );
}
