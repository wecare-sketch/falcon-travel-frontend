"use client";

import { Theme } from "@emotion/react";
import { Button, SxProps } from "@mui/material";
import Image from "next/image";

interface CustomButtonProps {
  label?: string;
  imageSrc?: string; // ← New: optional image source
  imageAlt?: string; // ← for accessibility
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  inverted?: boolean;
  imageSize?: number; // Optional: control image size
  sx?: SxProps<Theme>; // ← Add this
}

export function CustomButton({
  label,
  imageSrc,
  imageAlt = "Button Image",
  onClick,
  width = "120px",
  height,
  disabled = false,
  inverted = false,
  imageSize = 20,
  sx,
}: Readonly<CustomButtonProps>) {
  const backgroundColor = inverted ? "#fff" : "#2957A4";
  const textColor = inverted ? "#2957A4" : "#fff";
  const hoverBackground = inverted ? "#E3F0FF" : "#1d417a";

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: "none",
        backgroundColor,
        color: textColor,
        borderRadius: "6px",
        minWidth: width,
        ...(height && { height }),
        fontWeight: 600,
        fontSize: "12px",
        boxShadow: "none",
        border: inverted ? "1px solid #2957A4" : "none",
        "&:hover": {
          backgroundColor: hoverBackground,
          boxShadow: "none",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageSize}
          height={imageSize}
          style={{
            objectFit: "contain",
            maxWidth: imageSize,
            maxHeight: imageSize,
          }}
        />
      ) : (
        label
      )}
    </Button>
  );
}
