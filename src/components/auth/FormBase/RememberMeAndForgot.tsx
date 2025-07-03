"use client";
import { FormControlLabel, Checkbox } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

const RememberMeAndForgot = () => {
  return (
    <div className="flex sm:flex-row justify-between items-center mb-6 ml-4 below-320:flex-col">
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            defaultChecked
            sx={{
              padding: 0,
              marginRight: 1,
            }}
            icon={
              <span className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] border-2 border-black rounded-[4px] bg-white inline-block" />
            }
            checkedIcon={
              <span className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] border-2 border-black rounded-[4px] bg-white flex items-center justify-center">
                <CheckIcon
                  sx={{ fontSize: { xs: "12px", md: "16px" }, color: "#000" }}
                />
              </span>
            }
          />
        }
        label={
          <span className="text-[#1C2927] text-sm md:text-[18px] md:leading-[27px] font-normal">
            Keep me Logged in
          </span>
        }
      />
      <Link
        href="/auth/forgot-password"
        className="font-inter text-sm md:text-[18px] md:leading-[27px] text-[#345794] hover:underline"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default RememberMeAndForgot;
