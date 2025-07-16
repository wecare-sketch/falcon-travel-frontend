import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface LabelValuePairProps {
  label: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  labelSx?: object;
  valueSx?: object;
  rowSx?: object;
}

export function LabelValuePair({ label, value, icon, labelSx, valueSx, rowSx }: LabelValuePairProps) {
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Typography variant="body2" sx={{ color: "#345794", fontSize: "18px", fontWeight: 600, marginBottom: "8px", ...labelSx }}>{label}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", ...rowSx }}>
        {icon}
        <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 400, opacity: 0.5, ...valueSx }}>{value}</Typography>
      </Box>
    </Box>
  );
} 