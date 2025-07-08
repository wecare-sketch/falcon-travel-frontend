import { Chip,SxProps,Theme } from "@mui/material";

export function StatusChip({ label, sx }: { label: string; sx: SxProps<Theme> }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        ...sx,
        fontSize: "12px",
        fontWeight: 500,
        height: "24px",
        borderRadius: "12px",
      }}
    />
  );
} 