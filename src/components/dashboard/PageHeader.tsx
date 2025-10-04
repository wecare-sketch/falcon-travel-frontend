"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Box } from "@mui/material";

interface PageHeaderProps {
  onBack?: () => void;
  onRefresh?: () => void;
  title: string;
  headerContent?: React.ReactNode;
}

export function PageHeader({
  onBack,
  onRefresh,
  title,
  headerContent,
}: Readonly<PageHeaderProps>) {
  const showBack = typeof onBack === "function";
  const showRefresh = typeof onRefresh === "function";

  // Debug log
  console.log("PageHeader props:", {
    showBack,
    showRefresh,
    hasOnBack: !!onBack,
    title,
  });

  return (
    <div className="w-full bg-[#F1F6FF] px-6 py-1 rounded mb-6 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              type="button"
              aria-label="Back"
              className="flex items-center justify-center rounded-full cursor-pointer"
              style={{
                background: "#cedbf4",
                width: "30.56px",
                height: "32px",
              }}
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          )}
          <h2 className="text-[#101010] font-source font-normal text-[23px] leading-[100%] tracking-[0]">
            {title}
          </h2>
          {/* {showRefresh && (
            <button
              type="button"
              aria-label="Refresh"
              className="flex items-center justify-center rounded-full cursor-pointer ml-2"
              style={{
                background: "#cedbf4",
                width: "30.56px",
                height: "32px",
              }}
              onClick={onRefresh}
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </button>
          )} */}
        </div>

        {headerContent && (
          <Box className="flex justify-start md:justify-end">
            {headerContent}
          </Box>
        )}
      </div>
    </div>
  );
}
