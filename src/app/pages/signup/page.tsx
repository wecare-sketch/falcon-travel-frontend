"use client";
import { Box, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";


const SignupPage = () => {
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
            Personal Details
          </div>
          <div className="font-inter font-normal text-[1rem] md:text-[1.125rem] leading-[1.6875rem] text-[#232D1B] mb-8 text-center">
            Add your Basic info to proceed
          </div>
          <label
            htmlFor="fullName"
            className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2"
          >
            Full Name
          </label>
          <TextField
            id="fullName"
            placeholder="Enter Your Name"
            variant="outlined"
            fullWidth
            InputProps={{
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
          <label
            htmlFor="Phonenumber"
            className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2"
          >
            Phone Number
          </label>
          <TextField
            id="Phonenumber"
            placeholder="Enter Your Phone Number"
            variant="outlined"
            fullWidth
            InputProps={{
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
          <label
            htmlFor="DOB"
            className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2"
          >
            Date of Birth
          </label>
          <TextField
            id="DOB"
            placeholder="Enter Date"
            variant="outlined"
            fullWidth
            InputProps={{
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
          <label
            htmlFor="password"
            className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2"
          >
            Password
          </label>
          <TextField
            id="password"
            placeholder="Enter Your Password"
            variant="outlined"
            type="password"
            fullWidth
            InputProps={{
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
          <Box className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
            <button
              type="button"
              className="font-inter font-normal text-[1.125rem] leading-[1.6875rem] text-[#2F80ED] bg-transparent border border-[#2F80ED] px-8 py-2 rounded transition hover:bg-[#f0f7ff] w-full md:w-auto"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full md:w-[15.125rem] h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition"
              style={{
                background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
              }}
            ><Link href="/pages/login">Proceed</Link>
              
            </button>
          </Box>
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

export default SignupPage;