import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { FormInput } from "@/components/dashboard/ui/FormInput";
import { FormSection } from "@/components/dashboard/ui/FomSection";
import { Box } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const validateNotEmpty = (value: string, fieldName: string) => {
  return value.trim() !== "" || `${fieldName} cannot be just spaces`;
};

export function SectionEventDetails() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormSection title="Event Details">
      <Box sx={{ marginBottom: "16px" }}>
        <FormInput
          label="Event Name"
          placeholder="Enter Event Name"
          error={!!errors.name}
          helperText={errors.name?.message as string}
          {...register("name", {
            required: "Event name is required",
            validate: (value) => validateNotEmpty(value, "Event name"),
          })}
        />
      </Box>

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
        ].map(({ name, label, placeholder, required }) => (
          <Box
            key={name}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}
          >
            <FormInput
              label={label}
              placeholder={placeholder}
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
              {...register(name, {
                required,
                validate: (value) => validateNotEmpty(value, label),
              })}
            />
          </Box>
        ))}

        {/* Phone Number Field with PhoneInput */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 12px)" } }}>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: (value) => {
                if (!value || value.trim() === "") {
                  return "Phone number is required";
                }
                // Check if the phone number is valid (at least 10 digits including country code)
                const phoneNumber = value.replace(/\D/g, ""); // Remove all non-digits
                if (phoneNumber.length < 10) {
                  return "Please enter a valid phone number";
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <Box>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="w-full min-h-[40px] resize-none">
                  <PhoneInput
                    country="pk"
                    value={field.value}
                    onChange={(phone) => {
                      field.onChange(phone);
                      // Additional validation on change
                      const phoneNumber = phone.replace(/\D/g, "");
                      if (phoneNumber.length < 10) {
                        field.onChange(phone); // Still update the field but it will be invalid
                      }
                    }}
                    placeholder="Enter Phone Number"
                    inputClass="rounded-md min-h-[40px] resize-none text-base px-3 py-1"
                    containerClass="w-full"
                    buttonClass="border-0 bg-transparent"
                    isValid={(inputNumber) => {
                      const phoneNumber = inputNumber.replace(/\D/g, "");
                      return phoneNumber.length >= 10;
                    }}
                  />
                </div>
                {fieldState.error && (
                  <div className="text-red-500 text-sm mt-2">
                    {fieldState.error.message}
                  </div>
                )}
              </Box>
            )}
          />
        </Box>
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
                onChange={(date) => {
                  if (date && dayjs(date).isValid()) {
                    field.onChange(dayjs(date).toISOString());
                  } else {
                    field.onChange(null);
                  }
                }}
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
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 calc(25% - 12px)" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
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
                    sx: {},
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Location */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(25% - 12px)" } }}>
          <Controller
            name="pickupLocation"
            control={control}
            rules={{
              required: "Pickup location is required",
              validate: (value) => validateNotEmpty(value, "Pickup location"),
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Pickup Location"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 56,
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: "16px",
        }}
      >
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 calc(25% - 12px)" },
            maxWidth: { md: "calc(25% - 12px)" },
          }}
        >
          <Controller
            name="dropOffLocation"
            control={control}
            rules={{
              required: "Drop-off location is required",
              validate: (value) => validateNotEmpty(value, "Drop-off location"),
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Drop-off Location"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 56,
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>
    </FormSection>
  );
}
