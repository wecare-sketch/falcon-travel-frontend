"use client";

import { Box } from "@mui/material";
import InputField from "./InputField";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUpdateUserDetails } from "@/hooks/useUpdateUserDetails";

type ApiError = {
  message: string;
};

type UserDetails = {
  fullName: string;
  phone: string;
};

const PersonalDetailsForm = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useUpdateUserDetails();

  const handleSubmit = () => {
    if (!fullName || !phone) {
      toast.error("Please fill all fields.");
      return;
    }

    const userDetails: UserDetails = { fullName, phone };

    mutate(userDetails, {
      onSuccess: () => {
        toast.success("Details saved successfully!");
        router.push("/user/dashboard");
      },
      onError: (error: ApiError) => {
        toast.error(error.message || "Failed to save details.");
      },
    });
  };

  return (
    <Box className="bg-white rounded-[1.25rem] shadow-[0_8px_16px_0_#BBBBBB26] w-[90vw] max-w-full md:w-[28rem] lg:w-[32rem] mx-auto md:mx-8 my-4 md:my-8 flex flex-col px-4 md:px-10 pt-8 md:pt-12 pb-4 md:pb-6">
      <div className="font-inter font-bold text-[2rem] md:text-[2.375rem] leading-[1.25] text-[#1C2927] mb-2 text-center">
        Personal Details
      </div>
      <div className="font-inter font-normal text-[1rem] md:text-[1.125rem] leading-[1.6875rem] text-[#1C2927] mb-8 text-center">
        Add your Basic info to proceed
      </div>

      <InputField
        id="fullName"
        label="Full Name"
        placeholder="Enter Your Name"
        value={fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFullName(e.target.value)
        }
      />
      <InputField
        id="phone"
        label="Phone Number"
        placeholder="Enter Your Phone Number"
        value={phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(e.target.value)
        }
      />

      <Box className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? "Saving..." : "Proceed"}
        </button>
      </Box>

      <div className="mt-10 flex justify-center">
        <span className="font-inter font-normal text-sm md:text-[18px] md:leading-[27px] text-[#1C2927] text-center">
          Copyright © 2025 Falcon. All rights reserved
        </span>
      </div>
    </Box>
  );
};

export default PersonalDetailsForm;

