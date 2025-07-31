"use client";

import React from "react";
import FormBase from "@/components/auth/FormBase/FormBase";
import { useParams } from "next/navigation";
import AuthWrapper from "@/components/auth/AuthWrapper";


const InviteSignupPage = () => {
    const params = useParams();
    const inviteToken = params?.inviteToken as string;

    return <AuthWrapper><FormBase type="sign-up" inviteToken={inviteToken} /></AuthWrapper>;
};

export default InviteSignupPage;
