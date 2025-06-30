"use client";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import Image from "next/image";
import { LockKeyhole, Mail, Eye } from 'lucide-react';

const LoginPage = () => {
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
        <Box className="bg-white rounded-[1.25rem] shadow-[0_8px_16px_0_#BBBBBB26] w-[90vw] max-w-full md:w-[28rem] lg:w-[32rem] mx-auto md:mx-8 my-4 md:my-8 flex flex-col px-4 md:px-10 py-8 md:py-12">
          <div className="font-inter font-bold text-[2rem] md:text-[2.375rem] leading-[1.25] text-[#232D1B] mb-2 text-center">
            Sign in
          </div>
          <div className="font-inter font-normal text-[1rem] md:text-[1.125rem] leading-[1.6875rem] text-[#232D1B] mb-8 text-center">
            Access to your Falcon Acount
          </div>
          <div className="flex gap-4 mb-6">
            <button className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center">
              <Image src="/images/apple.png" alt="Apple" width={28} height={28} />
            </button>
            <button className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center">
              <Image src="/images/google.png" alt="Google" width={28} height={28} />
            </button>
            <button className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center">
              <Image src="/images/facebook.png" alt="Facebook" width={28} height={28} />
            </button>
          </div>
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-[#E0E0E0]" />
            <span className="mx-4 text-[#828282] text-sm">or sign in with email</span>
            <div className="flex-1 h-px bg-[#E0E0E0]" />
          </div>
          <label htmlFor="email" className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2">
            Email Id
          </label>
          <TextField
            id="email"
            placeholder="Enter Your Email"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <span className="pl-2 pr-2">
                  <Mail size={20} color="#828282" fill="#828282" />
                </span>
              ),
              style: {
                borderRadius: "0.375rem",
                height: "3.66rem",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "1rem",
                borderColor: "#D9D9D9",
                background: "#F8F9FA",
              },
            }}
            sx={{
              width: "100%",
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.375rem",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "1rem",
                background: "#F8F9FA",
                "& fieldset": {
                  borderColor: "#D9D9D9",
                },
                "&:hover fieldset": {
                  borderColor: "#345794",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#345794",
                },
              },
            }}
          />
          <label htmlFor="password" className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2">
            Password
          </label>
          <TextField
            id="password"
            placeholder="Enter Your Password"
            variant="outlined"
            type="password"
            fullWidth
            InputProps={{
              startAdornment: (
                <span className="pl-2 pr-2">
                  <LockKeyhole size={20} color="#828282" fill="#828282" />
                </span>
              ),
              endAdornment: (
                <span className="pr-2 cursor-pointer">
                  <Eye size={20} color="#828282" fill="#828282" />
                </span>
              ),
              style: {
                borderRadius: "0.375rem",
                height: "3.66rem",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "1rem",
                borderColor: "#D9D9D9",
                background: "#F8F9FA",
              },
            }}
            sx={{
              width: "100%",
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.375rem",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "1rem",
                background: "#F8F9FA",
                "& fieldset": {
                  borderColor: "#D9D9D9",
                },
                "&:hover fieldset": {
                  borderColor: "#345794",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#345794",
                },
              },
            }}
          />
          <div className="flex items-center justify-between mb-6">
            <FormControlLabel
              control={<Checkbox defaultChecked size="small" sx={{ color: '#345794', '&.Mui-checked': { color: '#345794' } }} />}
              label={<span className="font-inter text-sm text-[#232D1B]">Keep me Logged in</span>}
            />
            <a href="#" className="font-inter text-sm text-[#345794] hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition mb-4"
            style={{
              background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
            }}
          >
            Login
          </button>
          <div className="mt-8 md:mt-12 text-center text-[#232D1B] text-[1rem] font-inter font-normal opacity-70">
            Copyright © 2025 Falcon. All rights reserved
          </div>
        </Box>
        <Box className="hidden lg:flex flex-1 flex-col justify-end items-start mt-[500px] ml-10">
          <div
            className="font-inter font-medium text-[2.5rem] leading-[100%] tracking-normal text-white drop-shadow-lg"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            Drive Prestige, Arrive in Style
          </div>
          <div
            className="font-inter font-medium text-[4.25rem] leading-[100%] tracking-normal text-white drop-shadow-lg"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            Rent the Luxury You Deserve.
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default LoginPage;