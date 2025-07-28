"use client";

import React from "react";
import EmailInput from "./EmailInput";

interface ForgotPasswordProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPassword = ({ email, setEmail }: ForgotPasswordProps) => {
  return (
    <div className="mt-10">
      <EmailInput value={email} onChange={setEmail} />
    </div>
  );
};

export default ForgotPassword;
