"use client"

import { TextField, Typography, Box } from "@mui/material"
import type React from "react"

interface FormInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: "text" | "email" | "tel" | "number" | "date" | "time" | "datetime-local"
  required?: boolean
  disabled?: boolean
  multiline?: boolean
  rows?: number
  fullWidth?: boolean
  error?: boolean
  helperText?: string
  sx?: any
}

export function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
  multiline = false,
  rows = 1,
  fullWidth = true,
  error = false,
  helperText,
  sx = {},
}: FormInputProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: "#333",
          fontSize: "14px",
          marginBottom: "8px",
          fontWeight: required ? 500 : 400,
        }}
      >
        {label}
        {required && <span style={{ color: "#f44336", marginLeft: "4px" }}>*</span>}
      </Typography>
      <TextField
        fullWidth={fullWidth}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: multiline ? "auto" : "40px",
            "& fieldset": {
              borderColor: error ? "#f44336" : "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: error ? "#f44336" : "#4A5F8A",
            },
            "&.Mui-focused fieldset": {
              borderColor: error ? "#f44336" : "#4A5F8A",
            },
            "&.Mui-disabled": {
              backgroundColor: "#f5f5f5",
            },
          },
          "& .MuiInputBase-input": {
            padding: multiline ? "12px" : "8px 12px",
          },
          ...sx,
        }}
      />
    </Box>
  )
}
