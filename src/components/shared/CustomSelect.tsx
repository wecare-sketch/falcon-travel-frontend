"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ChevronDownIcon } from "../dashboard/ui/ChevronDownIcon";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  maxWidth?: number | string;
}

const ChevronIconComponent = () => (
  <ChevronDownIcon width={14} height={8} style={{ marginRight: 6 }} />
);

export function CustomSelect({
  label,
  value,
  onChange,
  options,
  maxWidth = 300,
}: Readonly<CustomSelectProps>) {
  return (
    <FormControl
      sx={{
        width: "100%",
        maxWidth,
        background: "#fff",
        borderRadius: "6px",
      }}
      size="small"
    >

      <InputLabel
        id={`${label}-label`}
        sx={{
          color: "#101010",
          fontSize: "14px",
          "&.Mui-focused": {
            color: "#345794",
          },
        }}
      >
        {label}
      </InputLabel>

      <Select
        labelId={`${label}-label`}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        IconComponent={ChevronIconComponent}
        sx={{
          paddingX: "12px",
          height: "40.24px",
          borderRadius: "6px",
          fontSize: "14px",
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            height: "100%",
            paddingTop: 0,
            paddingBottom: 0,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E4E6EE",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4A5F8A",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4A5F8A",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
