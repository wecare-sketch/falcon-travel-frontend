import React from "react";
import { Typography } from "@mui/material";

interface Props {
  otp: string[];
  onChange: (val: string, index: number) => void;
  timer: number;
}

const OtpSection = ({ otp, onChange, timer }: Props) => {
  return (
    <>
      <div className="flex justify-center gap-1 md:gap-2 mb-6 text-black mt-10 px-2">
        {otp.map((val, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            maxLength={1}
            value={val}
            onChange={(e) => onChange(e.target.value, i)}
            className="w-12 h-12 md:w-14 md:h-14 text-center border rounded text-base md:text-xl font-bold"
            style={{ borderColor: "#D9D9D9" }}
          />
        ))}
      </div>
      <Typography className="text-[#345794] mb-2 text-center">
        {`00:${String(timer).padStart(2, "0")}`}
      </Typography>
      <p className="text-center text-[#1C2927] mb-15 mt-6 cursor-pointer">
        Resend OTP
      </p>
    </>
  );
};

export default OtpSection;
