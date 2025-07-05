"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface SubItem {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  subItems?: SubItem[];
  defaultExpanded?: boolean;
}

export function SidebarNavItem({
  icon,
  label,
  onClick,
  subItems = [],
  defaultExpanded = false,
}: Readonly<SidebarNavItemProps>) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasSubItems = subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems) {
      setIsExpanded((prev) => !prev);
    }
    onClick?.();
  };

  return (
    <div className="space-y-0">
      {/* Main Item */}
      <div
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-color`}
        onClick={handleClick}
      >
        {icon}
        <span className="font-inter font-semibold text-[14px] leading-[150%] tracking-[0]">
          {label}
        </span>
        {hasSubItems && (
          <ChevronDown
            className={`w-4 h-4 ml-auto transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {/* Sub Items */}
      {hasSubItems && isExpanded && (
        <div className="relative">
          {/* Dotted vertical line */}
          <div className="absolute left-[26px] top-0 bottom-0 w-px border-l-2 border-dotted h-[85%] border-white" />

          <div className="space-y-0">
            {subItems.map((subItem, index) => (
              <div
                key={index}
                className={`relative w-full cursor-pointer transition-colors ${
                  subItem.isActive
                    ? "bg-[#F1F6FF] text-[#345794] border-l-2 border-[#345794]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
                onClick={subItem.onClick}
              >
                {/* Inner row with padding to keep indentation */}
                <div className="flex items-center gap-3 pl-10 pr-4 py-2 relative">
                  {/* Horizontal dotted line aligned with vertical line */}
                  <div className="absolute left-[26px] w-4 h-px border-t-2 border-dotted border-white" />
                  <span className="text-sm ml-2">{subItem.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
