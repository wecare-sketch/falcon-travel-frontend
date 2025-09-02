"use client";

import { Box, Typography, Button } from "@mui/material";
import { Phone, MapPin, Copy } from "lucide-react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { LabelValuePair } from "./ui/LabelValuePair";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
interface EventInfoCardProps {
  eventType: string | undefined;
  vehicle: string | undefined;
  pickupDate: string | undefined;
  phoneNumber: string | undefined;
  clientName: string | undefined;
  location: string | undefined;
  totalAmount: number | undefined;
  pendingAmount: number | undefined;
  onDownloadInvoice?: () => void;
  onShareIt?: () => void;
  onPayNow?: () => void;
  handleCopyClick?: () => void;
  onPayableAmountChange?: (amount: number) => void;
}

export function EventInfoCard({
  eventType,
  vehicle,
  pickupDate,
  phoneNumber,
  clientName,
  location,
  totalAmount,
  pendingAmount,
  onDownloadInvoice,
  onShareIt,
  onPayNow,
  handleCopyClick,
  onPayableAmountChange,
}: EventInfoCardProps) {
  const role = useSelector((state: RootState) => state.userRole.role);
  const calculatedPayableAmount = (totalAmount ?? 0) - (pendingAmount ?? 0);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #E0E0E0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "24px",
        }}
      >
        {/* Left Column */}
        <Box sx={{ flex: 1 }}>
          <LabelValuePair
            label="Event Type"
            value={eventType}
            icon={
              <Image
                src="/images/eventcalendar.png"
                width={20}
                height={20}
                alt="Event Calendar"
              />
            }
          />
          <LabelValuePair
            label="Date"
            value={pickupDate}
            icon={
              <Image src="/images/date.png" width={20} height={20} alt="date" />
            }
          />
          <LabelValuePair
            label="Client Name"
            value={clientName}
            icon={
              <Image
                src="/images/profile.png"
                width={20}
                height={20}
                alt="profile"
              />
            }
          />
        </Box>

        {/* Middle Column */}
        <Box sx={{ flex: 1 }}>
          <LabelValuePair
            label="Vehicle"
            value={vehicle}
            icon={
              <Image src="/images/car.png" width={20} height={20} alt="car" />
            }
          />
          <LabelValuePair
            label="Phone Number"
            value={phoneNumber}
            icon={<Phone className="w-4 h-4 text-[#4A5F8A]" />}
          />
          <LabelValuePair
            label="Location"
            value={location}
            icon={<MapPin className="w-4 h-4 text-[#4A5F8A] mt-1" />}
            rowSx={{ alignItems: "flex-start" }}
            valueSx={{ lineHeight: 1.4 }}
          />
        </Box>

        {/* Right Column: Total & Actions */}
        {role === "admin" ? (
          <Box sx={{ flex: 1, p: 2 }}>
            {/* Amount Summary Box */}
            <Box
              sx={{
                borderRadius: "12px",
                background: "#F9F9F9",
                padding: "20px",
                textAlign: "center",
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#345794",
                  mb: 1,
                }}
              >
                Total Amount
              </Typography>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "#757575",
                  mb: 2,
                }}
              >
                {totalAmount ? totalAmount : "0"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#345794",
                  mb: 1,
                }}
              >
                Remaining Amount
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#B00020",
                }}
              >
                {pendingAmount ? pendingAmount : "0"}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                disabled
                sx={{
                  flex: 1,
                  backgroundColor: "#F5F5F5",
                  color: "#BDBDBD",
                  borderColor: "#E0E0E0",
                  fontWeight: 500,
                  fontSize: 14,
                  textTransform: "none",
                }}
              >
                Download Invoice
              </Button>

              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  color: "#345794",
                  borderColor: "#345794",
                  fontWeight: 500,
                  fontSize: 14,
                  textTransform: "none",
                  backgroundColor: "#fff",
                  "&:hover": {
                    borderColor: "#2c4770",
                  },
                }}
                onClick={onShareIt}
              >
                Share Itinerary
              </Button>
              <div className="flex justify-center mt-2">
                <Copy
                  size={24}
                  color="#2196F3"
                  style={{ cursor: "pointer" }}
                  onClick={handleCopyClick}
                />
              </div>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#345794",
                fontWeight: 600,
                fontSize: 16,
                textTransform: "none",
                borderRadius: "6px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#2c4770",
                  boxShadow: "none",
                },
              }}
            >
              Send Reminder
            </Button>
          </Box>
        ) : (
          <Box sx={{ flex: 1 }}>
            <EventSummaryCard
              totalAmount={totalAmount}
              remainingAmount={pendingAmount}
              payableAmount={calculatedPayableAmount}
              onPayableAmountChange={onPayableAmountChange}
            />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <Button
                variant="outlined"
                disabled
                sx={{
                  flex: 1,
                  background: "#F5F5F5",
                  color: "#BDBDBD",
                  borderColor: "#E0E0E0",
                  fontWeight: 500,
                  fontSize: 16,
                  textTransform: "none",
                }}
                onClick={onDownloadInvoice}
              >
                Download Invoice
              </Button>
              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  color: "#2196F3",
                  borderColor: "#345794",
                  fontWeight: 500,
                  fontSize: 16,
                  textTransform: "none",
                  background: "#fff",
                }}
                onClick={onShareIt}
              >
                Share
              </Button>
              <div className="flex justify-center mt-2">
                <Copy
                  size={24}
                  color="#2196F3"
                  style={{ cursor: "pointer" }}
                  onClick={handleCopyClick}
                />
              </div>
            </Box>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                background: "#345794",
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "none",
                borderRadius: "6px",
                boxShadow: "none",
                "&:hover": {
                  background: "#2c4770",
                  boxShadow: "none",
                },
              }}
              onClick={onPayNow}
            >
              Pay Now
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

type EventSummaryCardProps = {
  totalAmount: number | undefined;
  remainingAmount: number | undefined;
  payableAmount: number | undefined;
  onPayableAmountChange?: (amount: number) => void;
};

function EventSummaryCard({
  totalAmount,
  remainingAmount,
  payableAmount,
  onPayableAmountChange,
}: EventSummaryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editablePayable, setEditablePayable] = useState(payableAmount);
  const [validationError, setValidationError] = useState<string>("");

  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => {
    if (editablePayable && editablePayable > (totalAmount || 0)) {
      setValidationError("Payable amount cannot exceed total amount");
      return;
    }
    if (editablePayable && editablePayable < 0) {
      setValidationError("Payable amount cannot be negative");
      return;
    }
    setValidationError("");
    setIsEditing(false);
    
    // Notify parent component of the final value
    if (onPayableAmountChange) {
      onPayableAmountChange(editablePayable || 0);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setEditablePayable(value);
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("");
    }
    
    // Validate in real-time
    if (value > (totalAmount || 0)) {
      setValidationError("Payable amount cannot exceed total amount");
    } else if (value < 0) {
      setValidationError("Payable amount cannot be negative");
    } else {
      setValidationError("");
    }
    
    // Notify parent component of the change
    if (onPayableAmountChange) {
      onPayableAmountChange(value);
    }
  };
  return (
    <Box
      sx={{
        border: "2px solid #2196F3",
        borderRadius: "12px",
        overflow: "hidden",
        width: { xs: "100%", sm: 370 },
        background: "#fff",
        marginBottom: 3,
      }}
    >
      {/* Top: Total Amount */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "#F3F7FE",
          padding: { xs: "16px 12px", sm: "20px 24px 16px 24px" },
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Box
          sx={{
            background: "#4285F4",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: { xs: 0, sm: 2 },
            marginBottom: { xs: 1, sm: 0 },
          }}
        >
          <Image
            src="/images/wallet.png"
            style={{ color: "#fff", fontSize: 28 }}
            width={20}
            height={20}
            alt="wallet"
          />
        </Box>
        <Typography
          sx={{ color: "#222", fontWeight: 500, fontSize: 18, flex: 1 }}
        >
          Total Amount:
        </Typography>
        <Typography
          sx={{
            color: "#345794",
            fontWeight: 700,
            fontSize: 32,
            marginLeft: { xs: 0, sm: 1 },
          }}
        >
          ${totalAmount}
        </Typography>
      </Box>

      {/* Bottom: Remaining & Payable */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          borderTop: "1px solid #E3EAF2",
          background: "#fff",
        }}
      >
        {/* Remaining Amount */}
        <Box
          sx={{
            flex: 1,
            background: "#F3FBF6",
            display: "flex",
            alignItems: "center",
            padding: { xs: "16px 12px", sm: "16px 12px" },
            gap: 1,
            borderRight: { xs: "none", sm: "1px solid #E3EAF2" },
            borderBottom: { xs: "1px solid #E3EAF2", sm: "none" },
          }}
        >
          <Box
            sx={{
              background: "#34A853",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 1,
            }}
          >
            <ArrowDownwardIcon sx={{ color: "#fff", fontSize: 18 }} />
          </Box>
          <Box>
            <Typography sx={{ color: "#222", fontWeight: 500, fontSize: 14 }}>
              Remaining Amount
            </Typography>
            <Typography
              sx={{ color: "#12B76A", fontWeight: 700, fontSize: 22 }}
            >
              $ {remainingAmount}
            </Typography>
          </Box>
        </Box>
        {/* Payable Amount */}
        <Box
          sx={{
            flex: 1,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            padding: { xs: "16px 12px", sm: "16px 12px" },
            gap: 1,
            position: "relative",
          }}
        >
          <Box
            sx={{
              background: "#F04438",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 1,
            }}
          >
            <ArrowUpwardIcon sx={{ color: "#fff", fontSize: 18 }} />
          </Box>
          <Box>
            <Typography sx={{ color: "#222", fontWeight: 500, fontSize: 14 }}>
              Payable Amount
            </Typography>
            {isEditing ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <input
                    type="number"
                    value={editablePayable}
                    onChange={handleChange}
                    className="text-black"
                    style={{
                      width: 80,
                      fontSize: 18,
                      fontWeight: 700,
                      padding: 4,
                      border: validationError ? "1px solid #d32f2f" : "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                    }}
                  />
                </Box>
                {validationError && (
                  <Typography sx={{ color: "#d32f2f", fontSize: 12, fontWeight: 500 }}>
                    {validationError}
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography sx={{ color: "#222", fontWeight: 700, fontSize: 22 }}>
                $ {editablePayable}
              </Typography>
            )}
          </Box>
          <Image
            src="/images/Edit.png"
            alt="edit"
            width={20}
            height={20}
            style={{
              fontSize: 18,
              position: "absolute",
              right: 12,
              top: "60%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              opacity: 0.7,
            }}
            onClick={handleEditClick}
          />
        </Box>
      </Box>
    </Box>
  );
}
