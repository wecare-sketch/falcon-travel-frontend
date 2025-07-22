"use client";

import { Box, Typography, Chip, IconButton } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { CustomDivider } from "../shared/CustomDivider";

interface MobileEventListItemProps {
  eventName: string;
  clientName: string;
  passenger: number;
  date: string;
  remainingAmount: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MobileEventListItem({
  eventName,
  clientName,
  passenger,
  date,
  remainingAmount,
  paymentStatus,
  onEdit,
  onDelete,
}: MobileEventListItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return { backgroundColor: "#E8F5E8", color: "#2E7D32" };
      case "Pending":
        return { backgroundColor: "#F87171", color: "#fff" };
      case "Overdue":
        return { backgroundColor: "#FFF3E0", color: "#F57C00" };
      default:
        return { backgroundColor: "#F5F5F5", color: "#666" };
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #E0E0E0",
        padding: "0px 15px",
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
        minHeight: 150,
        marginBottom: "12px",
      }}
    >
      {/* Main Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Event Name Row */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", marginTop: "10px" }}>
          <Typography
            sx={{
              color: "#345794",
              fontWeight: 400,
              fontSize: "14px",
              marginRight: "6px",
              whiteSpace: "nowrap",
            }}
          >
            Event Name:
          </Typography>
          <Typography
            sx={{
              color: "#787878",
              fontWeight: 400,
              fontSize: "16px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
            }}
          >
            {eventName}
          </Typography>
        </Box>
        <CustomDivider />

        {/* Client/Amount Row */}
        <Box sx={{ display: "flex", margin: "5px 0" }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}>
              Client Name:
            </Typography>
            <Typography sx={{ color: "#787878", fontSize: "16px", fontWeight: 400 }}>
              {clientName}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}>
              Remaining Amount:
            </Typography>
            <Typography sx={{ color: "#787878", fontSize: "16px", fontWeight: 400 }}>
              $ {remainingAmount}
            </Typography>
          </Box>
        </Box>

        {/* Passenger/Date Row */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}>
              Passenger:
            </Typography>
            <Typography sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}>
              {passenger}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}>
              Date:
            </Typography>
            <Typography sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}>
              {date}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Actions + Status Chip */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "flex-start",
          borderRadius: "8px",
          marginLeft: "8px",
          minWidth: "36px",
        }}
      >
        <IconButton
          onClick={onEdit}
          sx={{
            color: "#fff",
            width: 40,
            height: 45,
            borderRadius: "0px",
            marginBottom: "2px",
            background: "#888",
            "&:hover": { background: "#aaa" },
            p: 0,
          }}
        >
          <Edit style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton
          onClick={onDelete}
          sx={{
            color: "#fff",
            width: 40,
            height: 45,
            borderRadius: "0 0 20px 20px",
            background: "#888",
            "&:hover": { background: "#aaa" },
            p: 0,
          }}
        >
          <Trash2 style={{ width: 18, height: 18 }} />
        </IconButton>
      </Box>

      {/* Payment Status Chip - Separated Row to Avoid Overflow */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 2,
        }}
      >
        <Chip
          label={paymentStatus}
          size="small"
          sx={{
            ...getStatusColor(paymentStatus),
            fontSize: "13px",
            fontWeight: 500,
            height: "28px",
            borderRadius: "12px",
            px: 2,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </Box>
    </Box>
  );
}
