"use client";

import React from "react";
import PasswordInputWithToggle from "./PasswordInputWithToggle";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  return (
    <PasswordInputWithToggle
      label="Password"
      placeholder="Enter Your Password"
      value={value}
      onChange={onChange}
    />
  );
};

export default PasswordInput;
