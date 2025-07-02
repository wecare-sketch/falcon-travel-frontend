import React from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import RememberMeAndForgot from "./RememberMeAndForgot";
import SocialLoginButtons from "./SocialLoginButtons";

const SignInUpSection = ({ type }: { type: "sign-in" | "sign-up" }) => {
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
      <EmailInput />
      <PasswordInput />
      {!isSignUp && <RememberMeAndForgot />}
    </>
  );
};

export default SignInUpSection;
