"use client";

import { FormSection } from "@/components/dashboard/ui/FomSection";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { CustomButton } from "@/components/shared/CustomButton";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState } from "react"; 

export function SectionStops({
  onAddStop,
}: Readonly<{ onAddStop: () => void }>) {
  const { setValue, getValues } = useFormContext();

  const [currentStop, setCurrentStop] = useState("");

  const currentStops = getValues("addStops") || [];

  const handleAddStop = () => {
    if (currentStop.trim()) {
      const newStops = [...currentStops, currentStop.trim()];
      setValue("addStops", newStops);
      setCurrentStop("");
      onAddStop(); 
    }
  };

  return (
    <FormSection title="Add Stops">
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
        <Box sx={{ width: "300px" }}>
          <FormInput
            placeholder="Add Location"
            fullWidth
            inputProps={{
              value: currentStop,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCurrentStop(e.target.value),
            }}
          />
        </Box>

        <CustomButton
          onClick={handleAddStop}
          imageSrc="/images/plus.png"
          imageAlt="plus"
          width={50}
          height={40}
          imageSize={15}
          sx={{
            marginTop: "16px",
            minWidth: "120px", 
          }}
        />
      </Box>
      <Box sx={{ marginTop: "16px", width: "100%", maxWidth: "400px" }}>
        {currentStops.length > 0 && (
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap", 
              gap: "10px",
              padding: 0,
              margin: 0,
            }}
          >
            {currentStops.map((stop: string, index: number) => (
              <li
                key={index}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#F5F7FA",
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                  flex: "1 1 auto", 
                }}
              >
                {stop}
              </li>
            ))}
          </ul>
        )}
      </Box>
    </FormSection>
  );
}
