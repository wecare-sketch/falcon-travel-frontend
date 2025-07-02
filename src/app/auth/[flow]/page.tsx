import { JSX } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SignInForm from "@/components/auth/forms/SignInForm";
import SignUpForm from "@/components/auth/forms/SignUpForm";
import ForgotPasswordForm from "@/components/auth/forms/ForgotPasswordForm";
import OtpForm from "@/components/auth/forms/OTPForm";
import ResetPasswordForm from "@/components/auth/forms/ResetPasswordForm";
import { notFound } from "next/navigation";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ flow: string }>;
}) {
  const { flow } = await params;

  const formMap: Record<string, JSX.Element> = {
    "sign-in": <SignInForm />,
    "sign-up": <SignUpForm />,
    "forgot-password": <ForgotPasswordForm />,
    otp: <OtpForm />,
    "reset-password": <ResetPasswordForm />,
  };

  const form = formMap[flow];

  if (!form) return notFound();

  return <AuthWrapper>{form}</AuthWrapper>;
}
