"use client";

import { Box, Typography, Button, Tooltip } from "@mui/material";
import { Phone, MapPin, Copy } from "lucide-react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { LabelValuePair } from "./ui/LabelValuePair";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDownloadInvoice } from "@/hooks/events/useDownloadInvoice";

interface EventInfoCardProps {
  eventType: string | undefined;
  vehicle: string | undefined;
  pickupDate: string | undefined;
  phoneNumber: string | undefined;
  clientName: string | undefined;
  // location: string | undefined;
  pickupLocation: string | "--";
  dropOffLocation: string | "--";
  totalAmount: number | undefined;
  pendingAmount: number | undefined;
  depositAmount: number | undefined;
  userDepositedAmount?: number;
  isCurrentUserHost?: boolean;
  eventSlug: string | undefined;
  onShareIt?: () => void;
  onPayNow?: () => void;
  handleCopyClick?: () => void;
  onPayableAmountChange?: (amount: number) => void;
  currentPayableAmount?: number;
  onPayableAmountUpdate?: (amount: number) => void;
  onPerHeadChange?: (perHeadCount: number) => void;
}

export function EventInfoCard({
  eventType,
  vehicle,
  pickupDate,
  phoneNumber,
  clientName,
  pickupLocation,
  dropOffLocation,
  totalAmount,
  pendingAmount,
  depositAmount,
  userDepositedAmount,
  isCurrentUserHost,
  eventSlug,
  onShareIt,
  onPayNow,
  handleCopyClick,
  onPayableAmountChange,
  currentPayableAmount,
  onPayableAmountUpdate,
  onPerHeadChange,
}: EventInfoCardProps) {
  const role = useSelector((state: RootState) => state.userRole.role);

  const fallbackShare = (totalAmount ?? 0) - (pendingAmount ?? 0);
  const perHeadBaseFromParent = currentPayableAmount ?? fallbackShare;

  const [currentUserPayableAmount, setCurrentUserPayableAmount] =
    useState<number>(perHeadBaseFromParent);

  useEffect(() => {
    setCurrentUserPayableAmount(perHeadBaseFromParent);
  }, [perHeadBaseFromParent]);

  const { mutate: downloadInvoice, isPending: isDownloading } =
    useDownloadInvoice();

  const handleDownloadInvoiceClick = useCallback(() => {
    if (eventSlug) downloadInvoice({ eventSlug });
  }, [eventSlug, downloadInvoice]);

  const relevantDepositAmount =
    role === "admin" ? depositAmount : userDepositedAmount;

  const canDownloadInvoice =
    !!eventSlug &&
    (role === "admin"
      ? (relevantDepositAmount ?? 0) > 0
      : isCurrentUserHost
      ? true
      : (relevantDepositAmount ?? 0) > 0);

  const handlePayableAmountChange = useCallback(
    (finalAmount: number) => {
      setCurrentUserPayableAmount(finalAmount);
      onPayableAmountChange?.(finalAmount);
      onPayableAmountUpdate?.(finalAmount);
    },
    [onPayableAmountChange, onPayableAmountUpdate]
  );

  const handlePerHeadChange = useCallback(
    (perHeadCount: number) => {
      onPerHeadChange?.(perHeadCount);
    },
    [onPerHeadChange]
  );

  console.log("my dropoff location ", dropOffLocation);

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

          <LabelValuePair
            label="Drop off Location"
            value={dropOffLocation ?? "--"}
            icon={<MapPin className="w-4 h-4 text-[#4A5F8A] mt-1" />}
            rowSx={{ alignItems: "flex-start" }}
            valueSx={{ lineHeight: 1.4 }}
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
            label="Pickup Location"
            value={pickupLocation}
            icon={<MapPin className="w-4 h-4 text-[#4A5F8A] mt-1" />}
            rowSx={{ alignItems: "flex-start" }}
            valueSx={{ lineHeight: 1.4 }}
          />
        </Box>

        {/* Right Column: Totals & Actions */}
        {role === "admin" ? (
          <Box sx={{ flex: 1, p: 2 }}>
            {/* Amount Summary */}
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
                {totalAmount ?? 0}
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
                sx={{ fontSize: "24px", fontWeight: 700, color: "#B00020" }}
              >
                {pendingAmount ?? 0}
              </Typography>
            </Box>

            {/* Invoice status */}
            {canDownloadInvoice ? (
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
                  sx={{ color: "#2E7D32", fontSize: "12px", fontWeight: 500 }}
                >
                  ✅ Invoice available for download
                  {role === "admin" &&
                    ` ($${relevantDepositAmount ?? 0} deposited)`}
                </Typography>
              </Box>
            ) : (
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
                  sx={{ color: "#E65100", fontSize: "12px", fontWeight: 500 }}
                >
                  ⚠️ Invoice will be available after deposit payment ($
                  {relevantDepositAmount ?? 0} deposited)
                </Typography>
              </Box>
            )}

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
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
                      minWidth: 180,
                      backgroundColor: canDownloadInvoice ? "#fff" : "#F5F5F5",
                      color: canDownloadInvoice ? "#345794" : "#BDBDBD",
                      borderColor: canDownloadInvoice ? "#345794" : "#E0E0E0",
                      fontWeight: 500,
                      fontSize: 14,
                      textTransform: "none",
                      "&:hover": canDownloadInvoice
                        ? { borderColor: "#2c4770", backgroundColor: "#f8f9fa" }
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
                  minWidth: 180,
                  color: "#345794",
                  borderColor: "#345794",
                  fontWeight: 500,
                  fontSize: 14,
                  textTransform: "none",
                  backgroundColor: "#fff",
                  "&:hover": { borderColor: "#2c4770" },
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
                "&:hover": { backgroundColor: "#2c4770", boxShadow: "none" },
              }}
            >
              Send Reminder
            </Button>
          </Box>
        ) : (
          <Box sx={{ flex: 1 }}>
            {/* Payment Status for user */}
            {canDownloadInvoice ? (
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
                  sx={{ color: "#2E7D32", fontSize: "12px", fontWeight: 500 }}
                >
                  ✅ Invoice available for download
                  {isCurrentUserHost
                    ? " (Host privileges)"
                    : ` ($${relevantDepositAmount ?? 0} deposited)`}
                </Typography>
              </Box>
            ) : (
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
                  sx={{ color: "#E65100", fontSize: "12px", fontWeight: 500 }}
                >
                  ⚠️ Invoice will be available after deposit payment ($
                  {relevantDepositAmount ?? 0} deposited)
                </Typography>
              </Box>
            )}

            <EventSummaryCard
              totalAmount={totalAmount}
              remainingAmount={pendingAmount}
              payableAmount={perHeadBaseFromParent}
              onPayableAmountChange={handlePayableAmountChange}
              onPerHeadChange={handlePerHeadChange}
            />

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
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
                      minWidth: 180,
                      background: canDownloadInvoice ? "#fff" : "#F5F5F5",
                      color: canDownloadInvoice ? "#2196F3" : "#BDBDBD",
                      borderColor: canDownloadInvoice ? "#345794" : "#E0E0E0",
                      fontWeight: 500,
                      fontSize: 16,
                      textTransform: "none",
                      "&:hover": canDownloadInvoice
                        ? { borderColor: "#2c4770", backgroundColor: "#f8f9fa" }
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
                  minWidth: 120,
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
              disabled={currentUserPayableAmount <= 0}
              sx={{
                width: "100%",
                background:
                  currentUserPayableAmount <= 0 ? "#BDBDBD" : "#345794",
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "none",
                borderRadius: "6px",
                boxShadow: "none",
                "&:hover":
                  currentUserPayableAmount > 0
                    ? { background: "#2c4770", boxShadow: "none" }
                    : {},
                "&:disabled": { background: "#BDBDBD", color: "#fff" },
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
  onPerHeadChange?: (perHeadCount: number) => void;
};

function EventSummaryCard({
  totalAmount,
  remainingAmount,
  payableAmount,
  onPayableAmountChange,
  onPerHeadChange,
}: EventSummaryCardProps) {
  // Capture the INITIAL base amount only once - use useRef to make it truly immutable
  const initialBaseAmount = useRef<number | null>(null);

  // Set the initial amount only once when we first get a valid value
  if (
    initialBaseAmount.current === null &&
    typeof payableAmount === "number" &&
    payableAmount > 0
  ) {
    initialBaseAmount.current = payableAmount;
  }

  // Use the captured initial amount, fallback to 0 if not set yet
  const baseAmount = initialBaseAmount.current ?? 0;

  const [isEditing, setIsEditing] = useState(false);
  const [usePerHead, setUsePerHead] = useState<boolean>(false);
  const [headsCount, setHeadsCount] = useState<string>("1");
  const [headsError, setHeadsError] = useState<string>("");

  // Track the manually edited amount (for when not in per-head mode)
  const [customAmount, setCustomAmount] = useState<number>(baseAmount);

  // Current display amount
  const [displayAmount, setDisplayAmount] = useState<number>(baseAmount);

  // Edit mode states
  const [editAmount, setEditAmount] = useState<string>(String(baseAmount));
  const [editError, setEditError] = useState<string>("");

  // Track if custom amount has been set by user
  const [hasCustomAmount, setHasCustomAmount] = useState(false);

  const emit = useCallback(
    (val: number) => {
      onPayableAmountChange?.(Number.isFinite(val) ? val : 0);
    },
    [onPayableAmountChange]
  );

  const emitPerHead = useCallback(
    (count: number) => {
      onPerHeadChange?.(count);
    },
    [onPerHeadChange]
  );

  // Initialize states when base amount is first set
  useEffect(() => {
    if (baseAmount > 0 && !hasCustomAmount) {
      setCustomAmount(baseAmount);
      setDisplayAmount(baseAmount);
      setEditAmount(String(baseAmount));
    }
  }, [baseAmount, hasCustomAmount]);

  // Initialize per-head count to 1 on mount
  useEffect(() => {
    emitPerHead(1);
  }, [emitPerHead]);

  const handleHeadsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (!/^\d*$/.test(raw)) return;

      setHeadsCount(raw);

      if (raw === "" || raw === "0") {
        if (raw === "") {
          setHeadsError("Please enter number of people");
        } else {
          setHeadsError("Must be at least 1 person");
        }
        setDisplayAmount(0);
        emit(0);
        emitPerHead(0); // No valid heads count
        return;
      }

      const n = Number(raw);
      if (n >= 1) {
        setHeadsError("");
        // ALWAYS multiply the initial base amount
        const newAmount = baseAmount * n;
        setDisplayAmount(newAmount);
        emit(newAmount);
        emitPerHead(n); // Emit the actual heads count
      }
    },
    [baseAmount, emit, emitPerHead]
  );

  const handleHeadsBlur = useCallback(() => {
    if (headsCount === "" || Number(headsCount) < 1) {
      setHeadsCount("1");
      setHeadsError("");
      // Reset to base amount times 1
      const newAmount = baseAmount * 1;
      setDisplayAmount(newAmount);
      emit(newAmount);
      emitPerHead(1);
    }
  }, [headsCount, baseAmount, emit, emitPerHead]);

  const handleTogglePerHead = useCallback(
    (checked: boolean) => {
      setUsePerHead(checked);
      if (checked) {
        // When enabling per-head, start with base amount × 1
        setHeadsCount("1");
        setHeadsError("");
        const newAmount = baseAmount * 1;
        setDisplayAmount(newAmount);
        emit(newAmount);
        emitPerHead(1); // Set per-head count to 1
      } else {
        // When disabling per-head, go back to custom amount (or base if never edited)
        setHeadsCount("1");
        setHeadsError("");
        const amountToUse = hasCustomAmount ? customAmount : baseAmount;
        setDisplayAmount(amountToUse);
        emit(amountToUse);
        emitPerHead(1); // Reset to 1 when not using per-head
      }
    },
    [baseAmount, customAmount, hasCustomAmount, emit, emitPerHead]
  );

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
    setEditAmount(String(customAmount));
    setEditError("");
  }, [customAmount]);

  const handleSave = useCallback(() => {
    if (editError) return;
    const newAmount = Number(editAmount) || customAmount;

    // Mark that we have a custom amount
    setHasCustomAmount(true);
    setCustomAmount(newAmount);
    setIsEditing(false);
    setDisplayAmount(newAmount);
    emit(newAmount);
    // When manually editing, per-head is 1 (single payment)
    if (!usePerHead) {
      emitPerHead(1);
    }
  }, [editError, editAmount, customAmount, emit, usePerHead, emitPerHead]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditAmount(String(customAmount));
    setEditError("");
  }, [customAmount]);

  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (!/^\d*\.?\d{0,2}$/.test(raw)) return;
      setEditAmount(raw);

      if (raw === "") {
        setEditError("");
        return;
      }

      const value = Number(raw);
      if (value < 0) {
        setEditError("Amount cannot be negative");
        return;
      }
      if (remainingAmount != null && value > remainingAmount) {
        setEditError("Cannot exceed remaining amount");
        return;
      }
      if (totalAmount != null && value > totalAmount) {
        setEditError("Cannot exceed total amount");
        return;
      }

      setEditError("");
    },
    [remainingAmount, totalAmount]
  );

  const handleEditBlur = useCallback(() => {
    if (editAmount === "") {
      setEditAmount(String(customAmount));
    }
  }, [editAmount, customAmount]);

  return (
    <Box
      sx={{
        border: "2px solid #2196F3",
        borderRadius: "12px",
        overflow: "hidden",
        width: { xs: "100%", sm: 420 },
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
            gap: 1.25,
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
              flexShrink: 0,
            }}
          >
            <ArrowDownwardIcon sx={{ color: "#fff", fontSize: 18 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
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
            flex: 1.2,
            background: "#fff",
            display: "flex",
            alignItems: "stretch",
            gap: 1,
            padding: { xs: "16px 12px", sm: "16px 12px" },
          }}
        >
          {/* Icon circle */}
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
              flexShrink: 0,
              alignSelf: "center",
            }}
          >
            <ArrowUpwardIcon sx={{ color: "#fff", fontSize: 18 }} />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ color: "#222", fontWeight: 500, fontSize: 14 }}>
              Payable Amount
            </Typography>

            {/* Per-head toggle */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
                flexWrap: "wrap",
              }}
            >
              <input
                type="checkbox"
                checked={usePerHead}
                onChange={(e) => handleTogglePerHead(e.target.checked)}
                disabled={isEditing}
              />
              <Typography sx={{ fontSize: 13, color: "#444" }}>
                Pay per head
              </Typography>
            </Box>

            {/* VIEW MODE */}
            {!isEditing && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: 1,
                  pr: 1,
                }}
              >
                {usePerHead ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{ color: "#222", fontWeight: 700, fontSize: 20 }}
                      >
                        $ {baseAmount}
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontWeight: 600, fontSize: 16 }}
                      >
                        per head
                      </Typography>
                    </Box>

                    {/* Heads input */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 700, fontSize: 18, color: "#222" }}
                      >
                        ×
                      </Typography>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={headsCount}
                        onChange={handleHeadsChange}
                        onBlur={handleHeadsBlur}
                        className="text-black"
                        style={{
                          width: 80,
                          fontSize: 18,
                          fontWeight: 700,
                          padding: 6,
                          border: headsError
                            ? "1px solid #d32f2f"
                            : "1px solid #ccc",
                          borderRadius: "6px",
                        }}
                      />
                      <Typography
                        sx={{ color: "#6b7280", fontSize: 12, fontWeight: 600 }}
                      >
                        persons
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{ fontWeight: 700, fontSize: 16, color: "#222" }}
                      >
                        =
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 800, fontSize: 20, color: "#111827" }}
                      >
                        $ {displayAmount}
                      </Typography>
                    </Box>

                    {headsError && (
                      <Typography
                        sx={{ color: "#d32f2f", fontSize: 12, fontWeight: 500 }}
                      >
                        {headsError}
                      </Typography>
                    )}
                  </>
                ) : (
                  <Typography
                    sx={{ color: "#222", fontWeight: 700, fontSize: 22 }}
                  >
                    $ {displayAmount}
                  </Typography>
                )}
              </Box>
            )}

            {/* EDIT MODE */}
            {isEditing && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: 1,
                  pr: 1,
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 1 }}>
                  Edit your base amount:
                </Typography>

                {/* Edit amount input */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 700, fontSize: 18, color: "#222" }}
                  >
                    $
                  </Typography>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={editAmount}
                    onChange={handleEditChange}
                    onBlur={handleEditBlur}
                    className="text-black"
                    style={{
                      width: 120,
                      fontSize: 18,
                      fontWeight: 700,
                      padding: 6,
                      border: editError
                        ? "1px solid #d32f2f"
                        : "1px solid #ccc",
                      borderRadius: "6px",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                      if (e.key === "Escape") handleCancel();
                    }}
                  />
                </Box>

                {editError && (
                  <Typography
                    sx={{ color: "#d32f2f", fontSize: 12, fontWeight: 500 }}
                  >
                    {editError}
                  </Typography>
                )}

                {/* Save/Cancel buttons */}
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    disabled={!!editError || editAmount === ""}
                    onClick={handleSave}
                    sx={{
                      backgroundColor: "#345794",
                      fontSize: 12,
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#2c4770" },
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                      color: "#666",
                      borderColor: "#ccc",
                      fontSize: 12,
                      textTransform: "none",
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          {/* Edit button (only show when not editing and not in per-head mode) */}
          {!isEditing && !usePerHead && (
            <Box
              sx={{
                alignSelf: "center",
                ml: 1,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
              }}
            >
              <Image
                src="/images/Edit.png"
                alt="edit"
                width={20}
                height={20}
                style={{ cursor: "pointer", opacity: 0.85 }}
                onClick={handleEditClick}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
