"use client";

import { FormSection } from "@/components/dashboard/ui/FomSection";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { CustomButton } from "@/components/shared/CustomButton";
import { Box, IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState } from "react"; 
import { Trash2 } from "lucide-react";

export function SectionStops({
  onAddStop,
}: Readonly<{ onAddStop: () => void }>) {
  const { setValue, getValues } = useFormContext();

  const [stopFields, setStopFields] = useState([{ id: 1, value: "" }]);

  const currentStops = getValues("addStops") || [];

  const handleAddStopField = () => {
    const newField = { id: Date.now(), value: "" };
    setStopFields([...stopFields, newField]);
  };

  const handleRemoveStopField = (id: number) => {
    if (stopFields.length > 1) {
      setStopFields(stopFields.filter(field => field.id !== id));
    }
  };

  const handleStopChange = (id: number, value: string) => {
    setStopFields(stopFields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  };

  const handleSaveStops = () => {
    const validStops = stopFields
      .map(field => field.value.trim())
      .filter(stop => stop !== "");
    
    setValue("addStops", validStops);
    onAddStop();
  };

  return (
    <FormSection title="Add Stops">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Dynamic Stop Fields */}
        {stopFields.map((field, index) => (
          <Box key={field.id} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <FormInput
                placeholder={`Stop ${index + 1} - Add Location`}
                fullWidth
                inputProps={{
                  value: field.value,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
                    handleStopChange(field.id, e.target.value),
                }}
              />
            </Box>
            
            {/* Remove button - only show if more than one field */}
            {stopFields.length > 1 && (
              <IconButton
                onClick={() => handleRemoveStopField(field.id)}
                sx={{
                  color: "#ef4444",
                  "&:hover": { backgroundColor: "#fef2f2" },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            )}
          </Box>
        ))}

        {/* Add New Field Button */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <CustomButton
            onClick={handleAddStopField}
            imageSrc="/images/plus.png"
            imageAlt="plus"
            width={50}
            height={40}
            imageSize={15}
            sx={{
              minWidth: "120px", 
            }}
          />
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Add another stop location
          </span>
        </Box>

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <CustomButton
            onClick={handleSaveStops}
            label="Save Stops"
            sx={{
              backgroundColor: "#345794",
              color: "white",
              "&:hover": { backgroundColor: "#2c4770" },
            }}
          />
        </Box>
      </Box>

      {/* Display Current Stops */}
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
