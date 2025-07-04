"use client"

import type React from "react"
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Grid } from "@mui/material"
import { X, Plus } from "lucide-react"
import { useState } from "react"
import { FormInput } from "../ui/Form-Input"
import { FormSection } from "../ui/Fom-Section"
import { FormButton } from "../ui/Form-Button"


interface CreateEventModalProps {
  open: boolean
  onClose: () => void
  onCreateEvent: (eventData: any) => void
}

export function CreateEventModal({ open, onClose, onCreateEvent }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
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
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.eventType.trim()) newErrors.eventType = "Event type is required"
    if (!formData.clientName.trim()) newErrors.clientName = "Client name is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateEvent = () => {
    if (validateForm()) {
      onCreateEvent(formData)
      handleCancel() // Reset form and close modal
    }
  }

  const handleCancel = () => {
    setFormData({
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
    })
    setErrors({})
    onClose()
  }

  const handleAddStop = () => {
    if (formData.addStops.trim()) {
      console.log("Adding stop:", formData.addStops)
      // Here you would typically add the stop to a list
      setFormData((prev) => ({ ...prev, addStops: "" }))
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
          sx={{
            color: "#4A5F8A",
            fontWeight: 600,
            fontSize: "24px",
          }}
        >
          Create New Event
        </Typography>
        <IconButton onClick={onClose} sx={{ padding: "4px" }}>
          <X className="w-6 h-6 text-gray-600" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: "0", overflow: "visible" }}>
        {/* Event Details Section */}
        <FormSection title="Event Details">
          <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Event Type"
                placeholder="Enter Event Type"
                value={formData.eventType}
                onChange={handleInputChange("eventType")}
                required
                error={!!errors.eventType}
                helperText={errors.eventType}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Client Name"
                placeholder="Enter Client Name"
                value={formData.clientName}
                onChange={handleInputChange("clientName")}
                required
                error={!!errors.clientName}
                helperText={errors.clientName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Phone Number"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange("phoneNumber")}
                type="tel"
                required
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FormInput
                label="Pickup Date"
                placeholder="Enter Date"
                value={formData.pickupDate}
                onChange={handleInputChange("pickupDate")}
                type="date"
                required
                error={!!errors.pickupDate}
                helperText={errors.pickupDate}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormInput
                label="Drop-off Date"
                placeholder="Enter Date"
                value={formData.dropoffDate}
                onChange={handleInputChange("dropoffDate")}
                type="date"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormInput
                label="Pickup Time"
                placeholder="Enter Time"
                value={formData.pickupTime}
                onChange={handleInputChange("pickupTime")}
                type="time"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormInput
                label="Location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={handleInputChange("location")}
                required
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Add Stops Section */}
        <FormSection title="Add Stops">
          <Box sx={{ display: "flex", gap: "12px", alignItems: "end" }}>
            <Box sx={{ flexGrow: 1 }}>
              <FormInput
                label=""
                placeholder="Add Location"
                value={formData.addStops}
                onChange={handleInputChange("addStops")}
              />
            </Box>
            <FormButton
              onClick={handleAddStop}
              sx={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                padding: "0",
                marginBottom: "0px",
              }}
            >
              <Plus className="w-5 h-5" />
            </FormButton>
          </Box>
        </FormSection>

        {/* Vehicle Info Section */}
        <FormSection title="Vehicle Info">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Choose Vehicle"
                placeholder="Vehicle Name"
                value={formData.chooseVehicle}
                onChange={handleInputChange("chooseVehicle")}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Number of Passenger"
                placeholder="Add number"
                value={formData.numberOfPassenger}
                onChange={handleInputChange("numberOfPassenger")}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Hours Reserved"
                placeholder="Add Time"
                value={formData.hoursReserved}
                onChange={handleInputChange("hoursReserved")}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Payment Details Section */}
        <FormSection title="Payment Details">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Total Amount"
                placeholder="Enter Amount"
                value={formData.totalAmount}
                onChange={handleInputChange("totalAmount")}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Pending Amount"
                placeholder="Enter Amount"
                value={formData.pendingAmount}
                onChange={handleInputChange("pendingAmount")}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormInput
                label="Equity Division in Person"
                placeholder="Add Members"
                value={formData.equityDivision}
                onChange={handleInputChange("equityDivision")}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Footer Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            paddingTop: "24px",
            borderTop: "1px solid #E0E0E0",
          }}
        >
          <FormButton variant="outlined" onClick={handleCancel}>
            Cancel
          </FormButton>
          <FormButton onClick={handleCreateEvent}>+ Create Event</FormButton>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
