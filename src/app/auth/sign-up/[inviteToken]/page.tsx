"use client";

import React from "react";
import FormBase from "@/components/auth/FormBase/FormBase";
import { useParams } from "next/navigation";
import AuthWrapper from "@/components/auth/AuthWrapper";
import PublicOnly from "@/components/auth/PublicOnly";

const InviteSignupPage = () => {
  const params = useParams();
  const inviteToken = params?.inviteToken as string;

  return (
    <PublicOnly>
      <AuthWrapper>
        <FormBase type="sign-up" inviteToken={inviteToken} />
      </AuthWrapper>
    </PublicOnly>
  );
};

export default InviteSignupPage;
