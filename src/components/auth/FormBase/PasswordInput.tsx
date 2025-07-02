"use client";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label
        htmlFor="password"
        className="mb-2 text-[#000000] font-medium text-[0.9375rem]"
      >
        Password
      </label>
      <TextField
        id="password"
        placeholder="Enter Your Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <span className="pl-2 pr-2">
              <Image
                src="/images/lock.png"
                alt="Lock"
                width={32.42}
                height={27.53}
              />
            </span>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderRadius: "0.375rem",
            height: "3.66rem",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "1rem",
            background: "#F8F9FA",
          },
        }}
        sx={{
          width: "100%",
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.375rem",
            background: "#F8F9FA",
            "& fieldset": {
              borderColor: "#D9D9D9",
            },
            "&:hover fieldset": {
              borderColor: "#345794",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#345794",
            },
          },
        }}
      />
    </>
  );
};

export default PasswordInput;
