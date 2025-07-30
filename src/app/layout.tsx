"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Providers } from "@/redux/Provider";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Providers>
          <Toaster position="top-center" />
            {children}
          </Providers>
        </LocalizationProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
