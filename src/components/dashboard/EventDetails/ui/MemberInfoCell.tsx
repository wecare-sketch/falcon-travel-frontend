import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export function MemberInfoCell({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {icon}
      <Typography
        variant="body2"
        sx={{
          color: "#000",
          fontSize: "14px",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
} 