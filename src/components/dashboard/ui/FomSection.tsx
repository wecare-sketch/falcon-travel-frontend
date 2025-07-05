"use client";

import { Box, Typography } from "@mui/material";
import type React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  marginBottom?: string | number;
}

export function FormSection({
  title,
  children,
  marginBottom = "32px",
}: Readonly<FormSectionProps>) {
  return (
    <Box sx={{ marginBottom }}>
      <Typography
        variant="h6"
        sx={{
          color: "#333",
          fontWeight: 600,
          fontSize: "18px",
          marginBottom: "16px",
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
