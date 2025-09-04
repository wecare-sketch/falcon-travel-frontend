"use client";

import React from "react";
import FormBase from "@/components/auth/FormBase/FormBase";
import { useParams } from "next/navigation";
import AuthWrapper from "@/components/auth/AuthWrapper";

const InviteSignInPage = () => {
    const params = useParams();
    const inviteToken = params?.inviteToken as string;

    return <AuthWrapper><FormBase type="sign-in" inviteToken={inviteToken} /></AuthWrapper>;
};

export default InviteSignInPage;
