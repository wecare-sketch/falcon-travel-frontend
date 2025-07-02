"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthDayPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    if (date) {
      //will be required later
      //   const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
      //     date.getDate()
      //   ).padStart(2, "0")}`;
      setSelectedDate(date);
    }
  };

  return (
    <div className="relative w-full text-black [&_.react-datepicker-wrapper]:w-full">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MM/dd"
        placeholderText="MM/DD"
        showPopperArrow={false}
        showMonthDropdown
        showYearDropdown={false}
        dropdownMode="select"
        showDisabledMonthNavigation
        className="w-full h-[3.66rem] rounded-[0.375rem] bg-[#F8F9FA] border border-[#D9D9D9] px-4 font-inter text-[1rem] mb-4 focus:border-[#345794] focus:outline-none cursor-pointer"
      />
    </div>
  );
};

export default MonthDayPicker;
