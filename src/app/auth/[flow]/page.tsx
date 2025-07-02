import { JSX } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import SignInForm from "@/components/auth/forms/SignInForm";
import SignUpForm from "@/components/auth/forms/SignUpForm";
import { notFound } from "next/navigation";

// 👇 Make this async
export default async function AuthPage({ params }: { params: { flow: string } }) {
  const { flow } = await params;

  const formMap: Record<string, JSX.Element> = {
    "sign-in": <SignInForm />,
    "sign-up": <SignUpForm />,
    // add more flows here...
  };

  const form = formMap[flow];

  if (!form) return notFound();

  return <AuthWrapper>{form}</AuthWrapper>;
}
