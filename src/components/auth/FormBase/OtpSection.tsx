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
      <div className="flex justify-center gap-1 md:gap-2 mb-3 md:mb-4 text-black mt-4 md:mt-6 px-2">
        {otp.map((val, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            maxLength={1}
            value={val}
            onChange={(e) => onChange(e.target.value, i)}
            className="w-9 h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 text-center border rounded text-sm md:text-base lg:text-xl font-bold"
            style={{ borderColor: "#D9D9D9" }}
          />
        ))}
      </div>
      <Typography className="text-[#345794] mb-2 text-center text-sm md:text-base">
        {`00:${String(timer).padStart(2, "0")}`}
      </Typography>
      <p className="text-center text-[#1C2927] mb-6 md:mb-10 mt-3 md:mt-4 cursor-pointer text-sm md:text-base">
        Resend OTP
      </p>
    </>
  );
};

export default OtpSection;
