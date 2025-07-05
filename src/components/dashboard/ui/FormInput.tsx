import { TextField, Typography, Box } from "@mui/material";
import React from "react";
import type { SxProps, Theme } from "@mui/system";
import type { TextFieldProps } from "@mui/material/TextField";

interface FormInputProps
  extends Omit<TextFieldProps, "variant" | "value" | "onChange"> {
  label?: string;
  placeholder: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "time"
    | "datetime-local";
  required?: boolean;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  labelMarginBottom?: number | string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      required = false,
      error = false,
      helperText,
      multiline = false,
      rows = 1,
      sx = {},
      labelMarginBottom,
      ...rest
    },
    ref
  ) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            color: rest.disabled ? "#9e9e9e" : "#333", 
            fontSize: "14px",
            fontWeight: required ? 500 : 400,
            marginBottom: labelMarginBottom ?? "8px",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#f44336", marginLeft: "4px" }}>*</span>
          )}
        </Typography>
        <TextField
          inputRef={ref}
          fullWidth
          type={type}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          {...rest}
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
    );
  }
);

FormInput.displayName = "FormInput";
