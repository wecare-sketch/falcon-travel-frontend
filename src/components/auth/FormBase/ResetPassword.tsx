import React from "react";
import { TextField } from "@mui/material";

interface Props {
  password: string;
  confirmPassword: string;
  setPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
}

const ResetPassword = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}: Props) => {
  const sharedStyles = {
    borderRadius: "0.375rem",
    height: "3.66rem",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: "1rem",
    borderColor: "#D9D9D9",
    background: "#F8F9FA",
  };

  return (
    <>
      <TextField
        label="New Password"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{ style: sharedStyles }}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{ style: sharedStyles }}
      />
    </>
  );
};

export default ResetPassword;
