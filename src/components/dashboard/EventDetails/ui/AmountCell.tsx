import { Typography } from "@mui/material";

export function AmountCell({ amount }: { amount: number }) {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "#333",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      ${amount}
    </Typography>
  );
} 