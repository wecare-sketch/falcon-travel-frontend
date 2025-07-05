"use client";

import { TextField } from "@mui/material";
import { Search } from "lucide-react";

interface CustomSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxWidth?: number | string;
}

export function CustomSearchInput({
  value,
  onChange,
  placeholder = "Search...",
  maxWidth = 300,
}: Readonly<CustomSearchInputProps>) {
  return (
    <div className="relative" style={{ flex: "1 1 238px", maxWidth }}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          width: "100%",
          height: "40.24px",
          borderRadius: "6px",
          background: "#fff",
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            height: "40.24px",
            paddingRight: "40px",
            "& fieldset": {
              borderColor: "#E4E6EE",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#4A5F8A",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4A5F8A",
            },
            "& input::placeholder": {
              color: "#101010",
              opacity: 1,
              fontWeight: 500,
            },
          },
          input: {
            padding: "8px 9px 8px 12px",
            fontSize: "15px",
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          width: "32px",
          height: "32px",
          background: "#E9F1FB",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Search className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
      </div>
    </div>
  );
}
