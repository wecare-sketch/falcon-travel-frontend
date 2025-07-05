"use client";

import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  onBack?: () => void;
  title: string;
}

export function PageHeader({ onBack, title }: Readonly<PageHeaderProps>) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-6 w-full bg-[#F1F6FF] px-6 py-1 rounded">
      <button
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
      <h2 className="text-[#101010] font-source font-normal text-[23px] leading-[100%] tracking-[0]">
        {title}
      </h2>
    </div>
  );
}
