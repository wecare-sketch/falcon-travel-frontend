"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import SignInUpSection from "./SignInUpSection";
import ForgotPassword from "./ForgotPassword";
import OtpSection from "./OtpSection";
import ResetPassword from "./ResetPassword";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";
import { toast } from "react-hot-toast";



export type FormType =
  | "sign-in"
  | "sign-up"
  | "forgot-password"
  | "otp"
  | "reset-password";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const FormBase = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const { mutate: verifyOtpMutation} = useVerifyOtp();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    switch (type) {
      case "sign-in":
        if (!email || !loginPassword) {
          toast.error("Email and password are required.");
          return;
        }
        try {
          setLoading(true);
          const res = await axiosInstance.post<{ data?: string }>("/auth/login", {
            email,
            password: loginPassword,
          });

          const accessToken = res.data?.data;

          if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            router.push("/user/dashboard");
          } else {
            toast.error("Login failed: Invalid response");
          }
        } catch (err: unknown) {
          const error = err as ApiError;
          toast.error(error?.response?.data?.message || "Login failed");
        } finally {
          setLoading(false);
        }
        break;

      case "sign-up":
        if (!email || !loginPassword) {
          toast.error("Email and password are required.");
          return;
        }
        try {
          setLoading(true);
          await axiosInstance.post("/auth/sign-up", {
            email,
            password: loginPassword,
          });
          router.push("/personal-details");
        } catch (err: unknown) {
          const error = err as ApiError;
          toast.error(error?.response?.data?.message || "Sign up failed");
        } finally {
          setLoading(false);
        }
        break;

      case "forgot-password":
        if (!email) {
          toast.error("Email is required.");
          return;
        }
        try {
          setLoading(true);
          const res = await axiosInstance.post("/otp/request", { email });
          console.log(res)
          localStorage.setItem("emailForOtp", email);
          router.push("/auth/otp");
        } catch (err: unknown) {
          const error = err as ApiError;
          toast.error(error?.response?.data?.message || "Failed to send OTP");
        } finally {
          setLoading(false);
        }
        break;

      case "otp":
        const fullOtp = otp.join("");
        if (fullOtp.length !== 6) {
          toast.error("Please enter the full 6-digit OTP.");
          return;
        }

        try {
          setLoading(true);
          await verifyOtpMutation(fullOtp, {
            onSuccess: () => {
              router.push("/auth/reset-password");
            },
          });
        } catch (err) {
          const error = err as ApiError;
          toast.error(error?.response?.data?.message || "OTP verification failed");
        } finally {
          setLoading(false);
        }
        break;


        case "reset-password":
          if (!password || !confirmPassword) {
            toast.error("Both fields are required.");
            return;
          }
          if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
          }
        
          try {
            setLoading(true);
            const token = localStorage.getItem("access_token");
        
            if (!token) {
              toast.error("Token not found. Please request OTP again.");
              return;
            }
        
            const res = await axiosInstance.post<{ message: string }>(
              "/user/reset-password",
              { newPassword: password },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
        
            toast.success(res.data?.message || "Password reset successful");
        
            localStorage.removeItem("reset_token");
            localStorage.removeItem("emailForOtp");
        
            router.push("/user/dashboard");
          } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error?.response?.data?.message || "Password reset failed");
          } finally {
            setLoading(false);
          }
          break;
        


    }
  };

  const titleMap: Record<FormType, string> = {
    "sign-in": "Sign In",
    "sign-up": "Sign Up",
    "forgot-password": "Forgot Password",
    "otp": "Enter your OTP",
    "reset-password": "Set New Password",
  };

  const subtitleMap: Record<FormType, string> = {
    "sign-in": "Access your Falcon Account",
    "sign-up": "Create your Falcon Account",
    "forgot-password": "Please send OTP to the email to reset new password",
    "otp": "Enter your 6-digit OTP sent to your email",
    "reset-password": "Set new password. Add same password in both the fields to confirm",
  };

  const buttonLabelMap: Record<FormType, string> = {
    "sign-in": loading ? "Logging in..." : "Login",
    "sign-up": loading ? "Signing up..." : "Sign Up",
    "forgot-password": loading ? "Sending OTP..." : "Send OTP",
    "otp": "Confirm",
    "reset-password": "Login",
  };

  return (
    <Box
      className="bg-white rounded-[1.25rem] shadow-[0_8px_16px_0_#BBBBBB26] w-[90vw] max-w-full md:w-[28rem] lg:w-[32rem] mx-auto md:mx-8 my-4 md:my-8 px-4 md:px-10 pt-8 md:pt-12 pb-4 md:pb-6"
      sx={{
        minHeight: {
          xs: "15rem",
          sm: "15",
          md: "50rem",
        },
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
          <SignInUpSection
            type={type as "sign-in" | "sign-up"}
            email={email}
            setEmail={setEmail}
            password={loginPassword}
            setPassword={setLoginPassword}
          />
        )}

        {type === "forgot-password" && (
          <ForgotPassword email={email} setEmail={setEmail} />
        )}

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

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition mb-4 cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {buttonLabelMap[type]}
        </button>

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

      <div className="mt-10 flex justify-center">
        <span className="font-inter font-normal text-sm md:text-[18px] md:leading-[27px] text-[#1C2927] text-center">
          Copyright © 2025 Falcon. All rights reserved
        </span>
      </div>
    </Box>
  );
};

export default FormBase;
