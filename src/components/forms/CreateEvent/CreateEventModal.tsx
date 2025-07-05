"use client";

import { useForm, FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { X } from "lucide-react";
import { SectionEventDetails } from "./SectionEventDetails";
import { SectionStops } from "./SectionStops";
import { SectionVehicleInfo } from "./SectionVehicleInfo";
import { SectionPaymentDetails } from "./SectionPaymentDetails";
import { CreateEventFormData } from "@/types/form";
import { CustomButton } from "@/components/shared/CustomButton";

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

  const { handleSubmit, reset, getValues } = methods;

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
    handleCancel();
  };

  return (
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
  );
}
