"use client";

import { FormSection } from "@/components/dashboard/ui/FomSection";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { CustomButton } from "@/components/shared/CustomButton";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

export function SectionStops({
  onAddStop,
}: Readonly<{ onAddStop: () => void }>) {
  const { register, watch, setValue } = useFormContext();
  const currentStop = watch("addStops");

  const handleAdd = () => {
    const trimmed = currentStop?.trim();
    if (trimmed) {
      onAddStop();
      setValue("addStops", "");
    }
  };

  return (
    <FormSection title="Add Stops">
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
        <Box sx={{ width: "300px" }}>
          <FormInput placeholder="Add Location" {...register("addStops")} />
        </Box>
        <CustomButton
          onClick={handleAdd}
          imageSrc="/images/plus.png"
          imageAlt="plus"
          width={50}
          height={40}
          imageSize={15}
        />
      </Box>
    </FormSection>
  );
}
