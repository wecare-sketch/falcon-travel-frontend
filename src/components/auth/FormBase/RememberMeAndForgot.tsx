"use client";
import { FormControlLabel, Checkbox } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

const RememberMeAndForgot = () => {
  return (
    <div className="flex items-center justify-between mb-6 ml-4">
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            defaultChecked
            sx={{ padding: 0, marginRight: 1 }}
            icon={
              <span
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid #000",
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  display: "inline-block",
                }}
              />
            }
            checkedIcon={
              <span
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid #000",
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckIcon style={{ fontSize: 16, color: "#000" }} />
              </span>
            }
          />
        }
        label={
          <span className="text-[#1C2927] text-[18px] leading-[27px] font-normal">
            Keep me Logged in
          </span>
        }
      />
      <Link
        href="/auth/forgot-password"
        className="font-inter text-sm text-[#345794] hover:underline"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default RememberMeAndForgot;
