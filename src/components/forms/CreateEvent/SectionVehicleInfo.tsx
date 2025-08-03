"use client";

import { FormSection } from "@/components/dashboard/ui/FomSection";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

export function SectionVehicleInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormSection title="Vehicle Info">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: "16px",
        }}
      >
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Choose Vehicle"
            placeholder="Vehicle Name"
            error={!!errors.vehicle}
            helperText={errors.vehicle?.message as string}
            {...register("vehicle", {
              required: "Vehicle name is required",
            })}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Number of Passengers"
            placeholder="Add number"
            type="number"
            error={!!errors.passengerCount}
            helperText={errors.passengerCount?.message as string}
            {...register("passengerCount", {
              required: "Number of passengers is required",
              min: { value: 1, message: "At least one passenger required" },
            })}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Hours Reserved"
            placeholder="Add Time"
            error={!!errors.hoursReserved}
            helperText={errors.hoursReserved?.message as string}
            {...register("hoursReserved", {
              required: "Reservation time is required",
            })}
          />
        </Box>
      </Box>
    </FormSection>
  );
}
