"use client";

import { FormSection } from "@/components/dashboard/ui/FomSection";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { RootState } from "@/store";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export function SectionPaymentDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
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
            error={!!errors.totalAmount}
            helperText={errors.totalAmount?.message as string}
            {...register("totalAmount", {
              required: "Total amount is required",
              min: { value: 0, message: "Cannot be negative" },
            })}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Pending Amount"
            placeholder="Enter Amount"
            type="number"
            disabled={isUser}
            error={!!errors.pendingAmount}
            helperText={errors.pendingAmount?.message as string}
            {...register("pendingAmount", {
              required: "Pending amount is required",
              min: { value: 0, message: "Cannot be negative" },
            })}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <FormInput
            label="Equity Division in Person"
            placeholder="Add Members"
            disabled={isUser}
            error={!!errors.equityDivision}
            helperText={errors.equityDivision?.message as string}
            {...register(
              "equityDivision",
              isUser
                ? {}
                : {
                    required: "Equity division is required",
                    min: { value: 1, message: "At least 1 person required" },
                  }
            )}
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 100%" } }}>
          <label className="block text-lg sm:test-sm font-semibold mb-2">
            Trip Notes
          </label>
          <textarea
            {...register("tripNotes", {
              required: "Trip notes are required",
              maxLength: {
                value: 500,
                message: "Notes can't exceed 500 characters",
              },
            })}
            className="w-full p-2 border border-gray-200 rounded-md min-h-[150px] max-w-full resize-none sm:text-base md:text-lg lg:text-[16px]"
            placeholder="Add your trip notes here..."
          />
          {/* {errors.tripNotes && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tripNotes.message}
            </p>
          )} */}
        </Box>
      </Box>
    </FormSection>
  );
}
