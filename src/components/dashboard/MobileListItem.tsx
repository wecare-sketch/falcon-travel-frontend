"use client"

import { Box, Typography, Chip, IconButton } from "@mui/material"
import { Edit, Trash2 } from "lucide-react"

interface MobileEventListItemProps {
  eventName: string
  clientName: string
  passenger: number
  date: string
  remainingAmount: number
  paymentStatus: "Paid" | "Pending" | "Overdue"
  onEdit?: () => void
  onDelete?: () => void
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
        return { backgroundColor: "#E8F5E8", color: "#2E7D32" }
      case "Pending":
        return { backgroundColor: "#FFF3E0", color: "#F57C00" }
      case "Overdue":
        return { backgroundColor: "#FFEBEE", color: "#D32F2F" }
      default:
        return { backgroundColor: "#F5F5F5", color: "#666" }
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #E0E0E0",
        position: "relative",
      }}
    >
      {/* Action Icons */}
      <Box
        sx={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <IconButton
          onClick={onEdit}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "#6B7280",
            color: "white",
            "&:hover": {
              backgroundColor: "#4B5563",
            },
          }}
        >
          <Edit className="w-4 h-4" />
        </IconButton>

        <IconButton
          onClick={onDelete}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "#6B7280",
            color: "white",
            "&:hover": {
              backgroundColor: "#4B5563",
            },
          }}
        >
          <Trash2 className="w-4 h-4" />
        </IconButton>
      </Box>

      {/* Event Name */}
      <Box sx={{ marginBottom: "12px", paddingRight: "80px" }}>
        <Typography
          variant="body2"
          sx={{
            color: "#4A5F8A",
            fontSize: "12px",
            fontWeight: 500,
            marginBottom: "2px",
          }}
        >
          Event Name:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#333",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {eventName}
        </Typography>
      </Box>

      {/* Client Name and Remaining Amount */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          paddingRight: "80px",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#4A5F8A",
              fontSize: "12px",
              fontWeight: 500,
              marginBottom: "2px",
            }}
          >
            Client Name:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {clientName}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#4A5F8A",
              fontSize: "12px",
              fontWeight: 500,
              marginBottom: "2px",
            }}
          >
            Remaining Amount:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            $ {remainingAmount}
          </Typography>
        </Box>
      </Box>

      {/* Passenger, Date and Payment Status */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingRight: "80px",
        }}
      >
        <Box sx={{ display: "flex", gap: "24px" }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "#4A5F8A",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "2px",
              }}
            >
              Passenger:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#333",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {passenger}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "#4A5F8A",
                fontSize: "12px",
                fontWeight: 500,
                marginBottom: "2px",
              }}
            >
              Date:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#333",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {date}
            </Typography>
          </Box>
        </Box>

        {/* Payment Status */}
        <Chip
          label={paymentStatus}
          size="small"
          sx={{
            ...getStatusColor(paymentStatus),
            fontSize: "12px",
            fontWeight: 500,
            height: "24px",
            borderRadius: "12px",
          }}
        />
      </Box>
    </Box>
  )
}
