"use client";

import { Box, Typography, Button, Tooltip } from "@mui/material";
import { Phone, MapPin, Copy } from "lucide-react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { LabelValuePair } from "./ui/LabelValuePair";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDownloadInvoice } from "@/hooks/events/useDownloadInvoice";
interface EventInfoCardProps {
  eventType: string | undefined;
  vehicle: string | undefined;
  pickupDate: string | undefined;
  phoneNumber: string | undefined;
  clientName: string | undefined;
  location: string | undefined;
  totalAmount: number | undefined;
  pendingAmount: number | undefined;
  depositAmount: number | undefined;
  userDepositedAmount?: number;
  eventSlug: string | undefined;
  onShareIt?: () => void;
  onPayNow?: () => void;
  handleCopyClick?: () => void;
  onPayableAmountChange?: (amount: number) => void;
  currentPayableAmount?: number;
  onPayableAmountUpdate?: (amount: number) => void;
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
  depositAmount,
  userDepositedAmount,
  eventSlug,
  onShareIt,
  onPayNow,
  handleCopyClick,
  onPayableAmountChange,
  currentPayableAmount,
  onPayableAmountUpdate,
}: EventInfoCardProps) {
  const role = useSelector((state: RootState) => state.userRole.role);

  // Calculate fallback amount
  const fallbackPayableAmount = (totalAmount ?? 0) - (pendingAmount ?? 0);

  // Use the payable amount passed from parent (user's specific due amount) or fallback to calculated amount
  const payableAmountToUse = currentPayableAmount ?? fallbackPayableAmount;

  // State to track the current payable amount entered by user
  // This amount will be sent to the payment API instead of the event's pending amount
  const [currentUserPayableAmount, setCurrentUserPayableAmount] =
    useState(payableAmountToUse);

  // Update state when currentPayableAmount prop changes (e.g., when user's due amount is calculated)
  useEffect(() => {
    const newAmount = currentPayableAmount ?? fallbackPayableAmount;
    setCurrentUserPayableAmount(newAmount);
  }, [currentPayableAmount, fallbackPayableAmount]);

  const { mutate: downloadInvoice, isPending: isDownloading } =
    useDownloadInvoice();

  const handleDownloadInvoiceClick = () => {
    if (eventSlug) {
      downloadInvoice({ eventSlug });
    }
  };

  // Check if invoice can be downloaded (only when deposit amount > 0)
  // For admins: use event's depositAmount, For users: use their personal depositedAmount
  const relevantDepositAmount =
    role === "admin" ? depositAmount : userDepositedAmount;
  const canDownloadInvoice =
    eventSlug &&
    relevantDepositAmount !== undefined &&
    relevantDepositAmount !== null &&
    relevantDepositAmount > 0;

  console.log(
    "Invoice logic - role:",
    role,
    "relevantDepositAmount:",
    relevantDepositAmount,
    "canDownloadInvoice:",
    canDownloadInvoice
  );

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

            {/* Payment Status Indicator - based on relevantDepositAmount (admin: event's depositAmount, user: their depositedAmount) */}
            {(() => {
              if (
                relevantDepositAmount !== undefined &&
                relevantDepositAmount !== null &&
                relevantDepositAmount > 0
              ) {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      p: 1,
                      backgroundColor: "#E8F5E8",
                      borderRadius: "8px",
                      border: "1px solid #4CAF50",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#2E7D32",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      ✅ Invoice available for download ($
                      {relevantDepositAmount} deposited)
                    </Typography>
                  </Box>
                );
              } else {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      p: 1,
                      backgroundColor: "#FFF3E0",
                      borderRadius: "8px",
                      border: "1px solid #FFB74D",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#E65100",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      ⚠️ Invoice will be available after deposit payment ($
                      {relevantDepositAmount || 0} deposited)
                    </Typography>
                  </Box>
                );
              }
            })()}

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Tooltip
                title={
                  !eventSlug
                    ? "Event information not available"
                    : !canDownloadInvoice
                    ? `Invoice available after deposit payment (minimum $1)`
                    : "Click to download invoice"
                }
                placement="top"
              >
                <span>
                  <Button
                    variant="outlined"
                    disabled={!canDownloadInvoice || isDownloading}
                    onClick={handleDownloadInvoiceClick}
                    sx={{
                      flex: 1,
                      backgroundColor: canDownloadInvoice ? "#fff" : "#F5F5F5",
                      color: canDownloadInvoice ? "#345794" : "#BDBDBD",
                      borderColor: canDownloadInvoice ? "#345794" : "#E0E0E0",
                      fontWeight: 500,
                      fontSize: 14,
                      textTransform: "none",
                      "&:hover": canDownloadInvoice
                        ? {
                            borderColor: "#2c4770",
                            backgroundColor: "#f8f9fa",
                          }
                        : {},
                    }}
                  >
                    {isDownloading
                      ? "Downloading..."
                      : canDownloadInvoice
                      ? "Download Invoice"
                      : "No Deposit"}
                  </Button>
                </span>
              </Tooltip>

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
            {/* Payment Status Indicator for User - based on user's personal depositedAmount */}
            {(() => {
              if (
                relevantDepositAmount !== undefined &&
                relevantDepositAmount !== null &&
                relevantDepositAmount > 0
              ) {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      p: 1,
                      backgroundColor: "#E8F5E8",
                      borderRadius: "8px",
                      border: "1px solid #4CAF50",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#2E7D32",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      ✅ Invoice available for download ($
                      {relevantDepositAmount} deposited)
                    </Typography>
                  </Box>
                );
              } else {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      p: 1,
                      backgroundColor: "#FFF3E0",
                      borderRadius: "8px",
                      border: "1px solid #FFB74D",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#E65100",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      ⚠️ Invoice will be available after deposit payment ($
                      {relevantDepositAmount || 0} deposited)
                    </Typography>
                  </Box>
                );
              }
            })()}

            {/* EventSummaryCard tracks user's entered payable amount for payment processing */}
            <EventSummaryCard
              totalAmount={totalAmount}
              remainingAmount={pendingAmount}
              payableAmount={currentUserPayableAmount}
              onPayableAmountChange={(amount) => {
                // Update local state for UI display
                setCurrentUserPayableAmount(amount);
                // Notify parent components about the change
                if (onPayableAmountChange) {
                  onPayableAmountChange(amount);
                }
                // Update the payment amount that will be sent to the API
                if (onPayableAmountUpdate) {
                  onPayableAmountUpdate(amount);
                }
              }}
            />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <Tooltip
                title={
                  !eventSlug
                    ? "Event information not available"
                    : !canDownloadInvoice
                    ? `Invoice available after deposit payment (minimum $1)`
                    : "Click to download invoice"
                }
                placement="top"
              >
                <span>
                  <Button
                    variant="outlined"
                    disabled={!canDownloadInvoice || isDownloading}
                    onClick={handleDownloadInvoiceClick}
                    sx={{
                      flex: 1,
                      background: canDownloadInvoice ? "#fff" : "#F5F5F5",
                      color: canDownloadInvoice ? "#2196F3" : "#BDBDBD",
                      borderColor: canDownloadInvoice ? "#345794" : "#E0E0E0",
                      fontWeight: 500,
                      fontSize: 16,
                      textTransform: "none",
                      "&:hover": canDownloadInvoice
                        ? {
                            borderColor: "#2c4770",
                            backgroundColor: "#f8f9fa",
                          }
                        : {},
                    }}
                  >
                    {isDownloading
                      ? "Downloading..."
                      : canDownloadInvoice
                      ? "Download Invoice"
                      : "No Deposit"}
                  </Button>
                </span>
              </Tooltip>
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
            {/* Pay Now button will use the payable amount entered by user above */}
            {/* The payment will be processed for the amount shown in the Payable Amount field */}
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

  // Update editablePayable when payableAmount prop changes
  useEffect(() => {
    console.log(
      "EventSummaryCard: payableAmount prop changed to:",
      payableAmount
    );
    setEditablePayable(payableAmount);
  }, [payableAmount]);

  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => {
    // Validate that payable amount doesn't exceed total amount
    if (editablePayable && editablePayable > (totalAmount || 0)) {
      setValidationError("Payable amount cannot exceed total amount");
      return;
    }
    // Validate that payable amount is not negative
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

    // Validate in real-time to provide immediate feedback
    if (value > (totalAmount || 0)) {
      setValidationError("Payable amount cannot exceed total amount");
    } else if (value < 0) {
      setValidationError("Payable amount cannot be negative");
    } else {
      setValidationError("");
    }

    // Notify parent component of the change for payment processing
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
                      border: validationError
                        ? "1px solid #d32f2f"
                        : "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                    }}
                  />
                </Box>
                {validationError && (
                  <Typography
                    sx={{ color: "#d32f2f", fontSize: 12, fontWeight: 500 }}
                  >
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
