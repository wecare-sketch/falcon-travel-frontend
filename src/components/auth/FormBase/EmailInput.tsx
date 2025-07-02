"use client";
import { TextField } from "@mui/material";
import Image from "next/image";

const EmailInput = () => (
  <>
    <label
      htmlFor="email"
      className="mb-2 text-[#000000] font-medium text-[0.9375rem]"
    >
      Email Id
    </label>
    <TextField
      id="email"
      placeholder="Enter Your Email"
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: (
          <span className="pr-3">
            <Image
              src="/images/person_filled.png"
              alt="Person"
              width={32.42}
              height={27.53}
            />
          </span>
        ),
        style: {
          borderRadius: "0.375rem",
          height: "3.66rem",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: "1rem",
          borderColor: "#D9D9D9",
          background: "#F8F9FA",
        },
      }}
      sx={{
        width: "100%",
        mb: 4,
        "& .MuiOutlinedInput-root": {
          borderRadius: "0.375rem",
          background: "#F8F9FA",
          "& fieldset": {
            borderColor: "#D9D9D9",
          },
          "&:hover fieldset": {
            borderColor: "#345794",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#345794",
          },
        },
      }}
    />
  </>
);

export default EmailInput;
