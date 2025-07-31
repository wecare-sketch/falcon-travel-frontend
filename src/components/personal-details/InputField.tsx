"use client";
import { TextField } from "@mui/material";
import React from "react";

interface InputFieldProps {
  id: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  placeholder,
  label,
  value,
  onChange,
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
      value={value}
      onChange={onChange}
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
