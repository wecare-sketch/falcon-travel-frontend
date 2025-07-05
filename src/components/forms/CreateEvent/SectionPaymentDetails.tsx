"use client";

import { FormSection } from "@/components/dashboard/ui/FomSection";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { RootState } from "@/store";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export function SectionPaymentDetails() {
  const { register } = useFormContext();
  const role = useSelector((state: RootState) => state.userRole.role);
  const isUser = role === "user";

  return (
    <FormSection title="Payment Details">
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
            label="Total Amount"
            placeholder="Enter Amount"
            type="number"
            disabled={isUser}
            {...register("totalAmount")}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Pending Amount"
            placeholder="Enter Amount"
            type="number"
            disabled={isUser}
            {...register("pendingAmount")}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Equity Division in Person"
            placeholder="Add Members"
            disabled={isUser}
            {...register("equityDivision")}
          />
        </Box>
      </Box>
    </FormSection>
  );
}
