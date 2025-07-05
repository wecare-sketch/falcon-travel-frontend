"use client";

import { FormSection } from "@/components/dashboard/ui/FomSection";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

export function SectionVehicleInfo() {
  const { register } = useFormContext();

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
            {...register("chooseVehicle")}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Number of Passenger"
            placeholder="Add number"
            type="number"
            {...register("numberOfPassenger")}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Hours Reserved"
            placeholder="Add Time"
            {...register("hoursReserved")}
          />
        </Box>
      </Box>
    </FormSection>
  );
}
