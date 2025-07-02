"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import SignInUpSection from "./SignInUpSection";
import ForgotPassword from "./ForgotPassword";
import OtpSection from "./OtpSection";
import ResetPassword from "./ResetPassword";
import Link from "next/link";

export type FormType =
  | "sign-in"
  | "sign-up"
  | "forgot-password"
  | "otp"
  | "reset-password";

const FormBase = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (type === "otp" && timer > 0) {
      const interval = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(interval);
    }
  }, [timer, type]);

  const handleOtpChange = (val: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    const next = document.getElementById(`otp-${index + 1}`);
    if (val && next) next.focus();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (type) {
      case "sign-up":
        router.push("/personal-details");
        break;
      case "forgot-password":
        router.push("/auth/otp");
        break;
      case "otp":
        router.push("/auth/reset-password");
        break;
      case "reset-password":
        router.push("/auth/sign-in");
        break;
    }
  };

  const titleMap = {
    "sign-in": "Sign In",
    "sign-up": "Sign Up",
    "forgot-password": "Forgot Password",
    otp: "Enter your OTP",
    "reset-password": "Set New Password",
  };

  const subtitleMap = {
    "sign-in": "Access your Falcon Account",
    "sign-up": "Create your Falcon Account",
    "forgot-password": "Please send OTP to the email to reset new password",
    otp: "Enter your 6-Digit otp that is send it on your email",
    "reset-password":
      "Set new password add same password in both the field to confirm",
  };

  const buttonLabelMap = {
    "sign-in": "Login",
    "sign-up": "Sign Up",
    "forgot-password": "Send OTP",
    otp: "Confirm",
    "reset-password": "Login",
  };

  return (
    <Box
      className="bg-white rounded-[1.25rem] shadow-[0_8px_16px_0_#BBBBBB26] w-[90vw] max-w-full md:w-[28rem] lg:w-[32rem] mx-auto md:mx-8 my-4 md:my-8 px-4 md:px-10 pt-8 md:pt-12 pb-4 md:pb-6"
      sx={{
        minHeight: "50rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="flex-grow flex flex-col justify-center">
        <div className="font-inter font-bold text-[2rem] text-[#1C2927] mb-2 text-center">
          {titleMap[type]}
        </div>
        <div className="font-inter font-normal text-[1.125rem] text-[#1C2927] mb-8 text-center">
          {subtitleMap[type]}
        </div>

        {["sign-in", "sign-up"].includes(type) && (
          <SignInUpSection type={type as "sign-in" | "sign-up"} />
        )}

        {type === "forgot-password" && <ForgotPassword />}

        {type === "otp" && (
          <OtpSection otp={otp} onChange={handleOtpChange} timer={timer} />
        )}

        {type === "reset-password" && (
          <ResetPassword
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition mb-4 cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
          }}
        >
          {buttonLabelMap[type]}
        </button>

        {/* Switch links */}
        {(type === "sign-in" || type === "sign-up") && (
          <div className="text-center mt-2 text-[#1C2927]">
            {type === "sign-up" ? (
              <span>
                Already have an account?{" "}
                <Link
                  href="/auth/sign-in"
                  className="text-[#345794] font-bold hover:underline"
                >
                  Sign In
                </Link>
              </span>
            ) : (
              <span>
                New here?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-[#345794] font-bold hover:underline"
                >
                  Sign Up
                </Link>
              </span>
            )}
          </div>
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
