"use client";
import { TextField } from "@mui/material";
import React from "react";

const InputField = ({
  id,
  placeholder,
  label,
}: {
  id: string;
  placeholder: string;
  label: string;
}) => (
  <>
    <label
      htmlFor={id}
      className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2 text-[#000000]"
    >
      {label}
    </label>
    <TextField
      id={id}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      InputProps={{
        style: {
          borderRadius: "0.375rem",
          height: "3.66rem",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: "1rem",
          borderColor: "#D9D9D9",
          background: "#F8F9FA",
        },
      }}
      sx={{
        width: "100%",
        mb: 4,
        "& .MuiOutlinedInput-root": {
          borderRadius: "0.375rem",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: "1rem",
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

export default InputField;
