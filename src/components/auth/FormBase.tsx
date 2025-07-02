"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import SocialLoginButtons from "./SocialLoginButtons";
import RememberMeAndForgot from "./RememberMeAndForgot";

const FormBase = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const isSignUp = type === "sign-up";
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/personal-details");
  };

  return (
    <Box className="bg-white rounded-[1.25rem] shadow-[0_8px_16px_0_#BBBBBB26] w-[90vw] max-w-full md:w-[28rem] lg:w-[32rem] mx-auto md:mx-8 my-4 md:my-8 flex flex-col px-4 md:px-10 pt-8 md:pt-12 pb-4 md:pb-6">
      {/* Title */}
      <div className="font-inter font-bold text-[2rem] text-[#1C2927] mb-2 text-center">
        {isSignUp ? "Sign Up" : "Sign In"}
      </div>
      <div className="font-inter font-normal text-[1.125rem] text-[#1C2927] mb-8 text-center">
        {isSignUp ? "Create your Falcon Account" : "Access your Falcon Account"}
      </div>

      {/* Social Buttons */}
      <SocialLoginButtons />

      {/* Separator */}
      <div className="flex items-center mb-6">
        <div className="flex-1 h-px bg-[#E0E0E0]" />
        <span className="mx-4 text-[#1C2927] text-sm">
          {isSignUp ? "or sign up with email" : "or sign in with email"}
        </span>
        <div className="flex-1 h-px bg-[#E0E0E0]" />
      </div>

      {/* Inputs */}
      <EmailInput />
      <PasswordInput />

      {/* Remember/Forgot */}
      {!isSignUp && <RememberMeAndForgot />}

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition mb-4 cursor-pointer"
        style={{
          background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
        }}
      >
        {isSignUp ? "Sign Up" : "Login"}
      </button>

      {/* Switch link */}
      <div className="text-center mt-2 text-[#1C2927]">
        {isSignUp ? (
          <span>
            Already have an account?{" "}
            <a
              href="/auth/sign-in"
              className="text-[#345794] font-bold hover:underline"
            >
              Sign In
            </a>
          </span>
        ) : (
          <span>
            New here?{" "}
            <a
              href="/auth/sign-up"
              className="text-[#345794] font-bold hover:underline"
            >
              Sign Up
            </a>
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 flex justify-center">
        <span className="font-inter font-normal text-[18px] leading-[27px] text-[#1C2927]">
          Copyright © 2025 Falcon. All rights reserved
        </span>
      </div>
    </Box>
  );
};

export default FormBase;
