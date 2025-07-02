"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      className="relative min-h-screen w-full flex flex-col bg-cover bg-center"
      style={{
        backgroundImage:
          "radial-gradient(35.44% 52.19% at 87.5% 86.91%, #313131 0%, rgba(52, 87, 148, 0) 100%), url(/images/login_img.png)",
      }}
    >
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={157}
        height={157}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 hidden md:block"
      />
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {children}
        <Box className="hidden lg:flex flex-1 flex-col justify-end items-start mt-[500px] ml-10">
          <div className="font-inter font-medium text-[2.5rem] leading-[100%] text-white drop-shadow-lg">
            Drive Prestige, Arrive in Style
          </div>
          <div className="font-inter font-medium text-[4.25rem] leading-[100%] text-white drop-shadow-lg">
            Rent the Luxury You Deserve.
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default AuthWrapper;
