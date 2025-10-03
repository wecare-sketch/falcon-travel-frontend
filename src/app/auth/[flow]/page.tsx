// app/auth/[flow]/page.tsx  (SERVER component — no "use client")
import { JSX } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SignInForm from "@/components/auth/forms/SignInForm";
import SignUpForm from "@/components/auth/forms/SignUpForm";
import ForgotPasswordForm from "@/components/auth/forms/ForgotPasswordForm";
import OtpForm from "@/components/auth/forms/OTPForm";
import ResetPasswordForm from "@/components/auth/forms/ResetPasswordForm";
import PublicOnly from "@/components/auth/PublicOnly";
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

  // PublicOnly is a client component; rendering it here is fine
  return (
    <PublicOnly>
      <AuthWrapper>{form}</AuthWrapper>
    </PublicOnly>
  );
}
