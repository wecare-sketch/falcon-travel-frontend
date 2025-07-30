"use client";

import React from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import RememberMeAndForgot from "./RememberMeAndForgot";
import SocialLoginButtons from "./SocialLoginButtons";

const SignInUpSection = ({
  type,
  email,
  setEmail,
  password,
  setPassword,
}: {
  type: "sign-in" | "sign-up";
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
}) => {
  const isSignUp = type === "sign-up";

  return (
    <>
      <SocialLoginButtons />
      <div className="flex items-center mb-6">
        <div className="flex-1 h-px bg-[#E0E0E0]" />
        <span className="mx-4 text-[#1C2927] text-sm">
          {isSignUp ? "or sign up with email" : "or sign in with email"}
        </span>
        <div className="flex-1 h-px bg-[#E0E0E0]" />
      </div>
      <EmailInput value={email} onChange={setEmail} />
      <PasswordInput value={password} onChange={setPassword} />
      {!isSignUp && <RememberMeAndForgot />}
    </>
  );
};

export default SignInUpSection;
