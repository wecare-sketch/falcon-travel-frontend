"use client";

import { useForm, FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { X,User } from "lucide-react";
import { SectionEventDetails } from "./SectionEventDetails";
import { SectionStops } from "./SectionStops";
import { SectionVehicleInfo } from "./SectionVehicleInfo";
import { SectionPaymentDetails } from "./SectionPaymentDetails";
import { CreateEventFormData } from "@/types/form";
import { CustomButton } from "@/components/shared/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useRef, ChangeEvent } from "react";
import { ShareEventModal } from "../ShareEventModal";

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: CreateEventFormData) => void;
}

export function CreateEventModal({
  open,
  onClose,
  onCreateEvent,
}: Readonly<CreateEventModalProps>) {
  const methods = useForm({
    defaultValues: {
      eventImage: "",
      eventName: "",
      eventType: "",
      clientName: "",
      phoneNumber: "",
      pickupDate: "",
      dropoffDate: "",
      pickupTime: "",
      location: "",
      addStops: "",
      chooseVehicle: "",
      numberOfPassenger: "",
      hoursReserved: "",
      totalAmount: "",
      pendingAmount: "",
      equityDivision: "",
    },
  });
  const role = useSelector((state: RootState) => state.userRole.role);
  const { handleSubmit, reset, getValues, setValue, watch } = methods;
  const [showShareModal, setShowShareModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const eventImage = watch("eventImage");

  const handleAddStop = () => {
    const stop = getValues("addStops").trim();
    if (stop) {
      console.log("Adding stop:", stop);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CreateEventFormData) => {
    onCreateEvent(data);
    if (role === "admin") {
      onClose();
      setShowShareModal(true);
    } else {
      handleCancel();
    }
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setValue("eventImage", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "8px",
              padding: "24px",
              minHeight: "600px",
              maxHeight: "90vh",
              overflow: "auto",
            },
          }}
        >
          {/* Header */}
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 16px 0",
              borderBottom: "1px solid #E0E0E0",
              marginBottom: "24px",
            }}
          >
            <Typography
              component="span"
              variant="h5"
              sx={{ color: "#345794", fontWeight: 600, fontSize: "24px" }}
            >
              Create New Event
            </Typography>
            <IconButton onClick={onClose} sx={{ padding: "4px" }}>
              <X className="w-6 h-6 text-gray-600" />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ padding: 0, overflow: "visible" }}>
            {/* Add Event Image Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "24px",
              }}
            >
               <Typography
                variant="body2"
                sx={{ color: "#000000",fontSize:"20px" }}
              >
                {eventImage ? "Change Image" : "Add Event Image"}
              </Typography>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <Avatar
                src={eventImage}
                sx={{
                  width: 100,
                  height: 100,
                  cursor: "pointer",
                  backgroundColor: "#F5F7FA",
                  border: "1px dashed #D1D5DB",
                }}
                onClick={handleImageClick}
              >
                {!eventImage && (
                  <div className="flex flex-col justify-center items-center">
                  <div><User className="w-10 h-10 text-gray-600" /></div>
                  <div><Typography
                    variant="body2"
                    sx={{ color: "#6B7280", textAlign: "center" }}
                  >
                    Add Image
                  </Typography></div>
                  </div>
                )}
              </Avatar>
            </Box>

            <SectionEventDetails />
            <SectionStops onAddStop={handleAddStop} />
            <SectionVehicleInfo />
            <SectionPaymentDetails />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <CustomButton
                label="Cancel"
                onClick={handleCancel}
                inverted
                sx={{
                  minWidth: { xs: "100%", sm: "140px" },
                  height: 44,
                }}
              />
              <CustomButton
                label="+ Create Event"
                onClick={handleSubmit(onSubmit)}
                sx={{
                  minWidth: { xs: "100%", sm: "180px" },
                  height: 44,
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </FormProvider>
      <ShareEventModal open={showShareModal} onClose={handleCloseShareModal} />
    </>
  );
}