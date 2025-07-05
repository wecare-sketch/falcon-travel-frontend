import { useFormContext, Controller } from "react-hook-form";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { FormSection } from "@/components/dashboard/ui/FomSection";
import { Box } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export function SectionEventDetails() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormSection title="Event Details">
      {/* Row 1 */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: "16px",
        }}
      >
        {[
          {
            name: "eventType",
            label: "Event Type",
            placeholder: "Enter Event Type",
            required: "Event type is required",
          },
          {
            name: "clientName",
            label: "Client Name",
            placeholder: "Enter Client Name",
            required: "Client name is required",
          },
          {
            name: "phoneNumber",
            label: "Phone Number",
            placeholder: "Enter Phone Number",
            required: "Phone number is required",
            type: "tel" as const,
          },
        ].map(({ name, label, placeholder, required, type }) => (
          <Box
            key={name}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}
          >
            <FormInput
              label={label}
              placeholder={placeholder}
              type={type}
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
              {...register(name, required ? { required } : {})}
            />
          </Box>
        ))}
      </Box>

      {/* Row 2 */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: "16px",
        }}
      >
        {/* Pickup Date */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 12px)" } }}>
          <Controller
            name="pickupDate"
            control={control}
            rules={{ required: "Pickup date is required" }}
            render={({ field, fieldState }) => (
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    label: "Pickup Date",
                    placeholder: "Enter Date",
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Drop-off Date */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 12px)" } }}>
          <Controller
            name="dropoffDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    label: "Drop-off Date",
                    placeholder: "Enter Date",
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Pickup Time */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 12px)" } }}>
          <Controller
            name="pickupTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(time) => field.onChange(time?.toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    label: "Pickup Time",
                    placeholder: "Enter Time",
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Location */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 12px)" } }}>
          <FormInput
            placeholder="Enter Location"
            error={!!errors.location}
            helperText={errors.location?.message as string}
            {...register("location", { required: "Location is required" })}
            labelMarginBottom={0}
            sx={{
              mt: 0,
              "& .MuiInputBase-root": {
                height: 56,
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
              },
            }}
          />
        </Box>
      </Box>
    </FormSection>
  );
}
