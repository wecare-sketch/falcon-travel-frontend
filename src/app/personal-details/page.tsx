"use client";
import { Box, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(month: number) {
  const year = new Date().getFullYear();
  return new Date(year, month + 1, 0).getDate();
}

function MonthDayCalendar({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [day, setDay] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDayClick = (d: number) => {
    setDay(String(d));
    onChange(`${String(month + 1).padStart(2, "0")}/${String(d).padStart(2, "0")}`);
    setShow(false);
  };

  const daysInMonth = getDaysInMonth(month);
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="relative w-full">
      <input
        readOnly
        value={value}
        onClick={() => setShow(true)}
        placeholder="MM/DD"
        className="w-full h-[3.66rem] rounded-[0.375rem] bg-[#F8F9FA] border border-[#D9D9D9] px-4 font-inter text-[1rem] mb-4 focus:border-[#345794] focus:outline-none cursor-pointer"
      />
      {show && (
        <div ref={ref} className="absolute z-50 bg-white border border-gray-300 rounded shadow-lg p-2 mt-1 w-[220px] text-sm">
          <div className="flex items-center justify-between mb-1">
            <button onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}>&lt;</button>
            <span className="font-bold">{months[month]}</span>
            <button onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}>&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {weekDays.map((d, i) => (
              <div key={i} className="font-bold">{d}</div>
            ))}
            {Array.from({ length: new Date(2000, month, 1).getDay() }).map((_, i) => (
              <div key={`empty-${i}`}></div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
              <button
                key={i + 1}
                className={`py-0.5 rounded ${day == String(i + 1) ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
                style={{ fontSize: '0.95em' }}
                onClick={() => handleDayClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const PersonalDetailsPage = () => {
  const [dob, setDob] = useState("");

  return (
    <Box
      className="relative min-h-screen w-full flex flex-col bg-cover bg-center"
      style={{
        backgroundImage:
          "radial-gradient(35.44% 52.19% at 87.5% 86.91%, #313131 0%, rgba(52, 87, 148, 0) 100%), url(/images/login_img.png)",
      }}
    >
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={157}
        height={157}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 hidden md:block"
      />
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        <Box className="bg-white rounded-[1.25rem] shadow-[0_8px_16px_0_#BBBBBB26] w-[90vw] max-w-full md:w-[28rem] lg:w-[32rem] mx-auto md:mx-8 my-4 md:my-8 flex flex-col px-4 md:px-10 py-8 md:py-12">
          <div className="font-inter font-bold text-[2rem] md:text-[2.375rem] leading-[1.25] text-[#1C2927] mb-2 text-center">
            Personal Details
          </div>
          <div className="font-inter font-normal text-[1rem] md:text-[1.125rem] leading-[1.6875rem] text-[#1C2927] mb-8 text-center">
            Add your Basic info to proceed
          </div>
          <label
            htmlFor="fullName"
            className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2 text-[#000000]"
          >
            Full Name
          </label>
          <TextField
            id="fullName"
            placeholder="Enter Your Name"
            variant="outlined"
            fullWidth
            InputProps={{
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
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "1rem",
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
          <label
            htmlFor="Phonenumber"
            className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2 text-[#000000]"
          >
            Phone Number
          </label>
          <TextField
            id="Phonenumber"
            placeholder="Enter Your Phone Number"
            variant="outlined"
            fullWidth
            InputProps={{
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
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "1rem",
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
          <label
            htmlFor="dob-mmdd"
            className="font-inter font-medium text-[0.9375rem] leading-[100%] mb-2 text-[#000000]"
          >
            Date of Birth (MM/DD)
          </label>
          <MonthDayCalendar value={dob} onChange={setDob} />
          <Box className="flex flex-col md:flex-row justify-between items-center  gap-4">
            <button
              type="submit"
              className="w-full h-[3.57rem] rounded-[0.25rem] font-inter font-medium text-[1rem] leading-[100%] text-white transition cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #345794 0%, #101B2E 100%)",
              }}
            >
              <Link href="/login">Proceed</Link>
            </button>
          </Box>
          <div className="mt-24 md:mt-28 flex justify-end">
            <span className="font-inter font-normal text-[18px] leading-[27px] text-[#1C2927] w-full h-full flex items-center justify-center">
              Copyright © 2025 Falcon. All rights reserved
            </span>
          </div>
        </Box>
        <Box className="hidden lg:flex flex-1 flex-col justify-end items-start mt-[500px] ml-10">
          <div
            className="font-inter font-medium text-[2.5rem] leading-[100%] tracking-normal text-white drop-shadow-lg"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            Drive Prestige, Arrive in Style
          </div>
          <div
            className="font-inter font-medium text-[4.25rem] leading-[100%] tracking-normal text-white drop-shadow-lg"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            Rent the Luxury You Deserve.
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default PersonalDetailsPage;