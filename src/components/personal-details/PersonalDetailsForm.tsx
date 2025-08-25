"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUpdateUserDetails } from "@/hooks/useUpdateUserDetails";
import PhoneInput from "react-phone-input-2"; // Import PhoneInput component
import "react-phone-input-2/lib/style.css"; // Import the default styles
import InputField from "./InputField";

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
  const [phoneError, setPhoneError] = useState<string | null>(null); // Track phone validation error
  const router = useRouter();

  const { mutate, isPending } = useUpdateUserDetails();

  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return "Phone number is required";
    }
    // Check if the phone number is valid (at least 10 digits including country code)
    const phone = phoneNumber.replace(/\D/g, ''); // Remove all non-digits
    if (phone.length < 10) {
      return "Please enter a valid phone number";
    }
    return null;
  };

  const handleSubmit = () => {
    if (!fullName || !phone) {
      toast.error("Please fill all fields.");
      return;
    }

    const phoneValidationError = validatePhoneNumber(phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      toast.error(phoneValidationError);
      return;
    }

    const userDetails: UserDetails = { fullName, phone };
    setPhoneError("");
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

      {/* Full Name Field */}
      <InputField
        id="fullName"
        label="Full Name"
        placeholder="Enter Your Name"
        value={fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFullName(e.target.value)
        }
      />

      <div className="mb-6 ">
        <label className="block text-lg text-black sm:text-sm mb-2">Phone Number</label>
        <div className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md min-h-[54px] resize-none sm:text-base md:text-lg lg:text-[16px]">
          <PhoneInput
            country="pk"
            value={phone}
            onChange={(phoneNumber) => {
              setPhone(phoneNumber);
              // Clear error when user starts typing
              if (phoneError) {
                setPhoneError(null);
              }
            }}
            placeholder="Enter Your Phone Number"
            inputClass="rounded-md min-h-[40px] resize-none sm:text-base md:text-lg lg:text-[16px] text-black"
            isValid={(inputNumber) => {
              const phone = inputNumber.replace(/\D/g, '');
              return phone.length >= 10;
            }}
          />
        </div>

        {phoneError && (
          <div className="text-red-500 text-sm mt-2">{phoneError}</div>
        )}
      </div>

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
