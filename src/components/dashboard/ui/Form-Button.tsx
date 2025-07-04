"use client"

import { Button } from "@mui/material"
import type React from "react"

interface FormButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "contained" | "outlined" | "text"
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success"
  disabled?: boolean
  fullWidth?: boolean
  size?: "small" | "medium" | "large"
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  type?: "button" | "submit" | "reset"
  sx?: any
}

export function FormButton({
  children,
  onClick,
  variant = "contained",
  color = "primary",
  disabled = false,
  fullWidth = false,
  size = "medium",
  startIcon,
  endIcon,
  type = "button",
  sx = {},
}: FormButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = {
      padding: "8px 24px",
      borderRadius: "6px",
      textTransform: "none" as const,
      fontWeight: 500,
    }

    if (variant === "contained") {
      return {
        ...baseStyles,
        backgroundColor: "#4A5F8A",
        color: "white",
        "&:hover": {
          backgroundColor: "#3A4F7A",
        },
        "&:disabled": {
          backgroundColor: "#E0E0E0",
          color: "#999",
        },
      }
    }

    if (variant === "outlined") {
      return {
        ...baseStyles,
        borderColor: "#E0E0E0",
        color: "#666",
        backgroundColor: "transparent",
        "&:hover": {
          borderColor: "#4A5F8A",
          backgroundColor: "transparent",
          color: "#4A5F8A",
        },
        "&:disabled": {
          borderColor: "#E0E0E0",
          color: "#999",
        },
      }
    }

    return baseStyles
  }

  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
      sx={{
        ...getButtonStyles(),
        ...sx,
      }}
    >
      {children}
    </Button>
  )
}
