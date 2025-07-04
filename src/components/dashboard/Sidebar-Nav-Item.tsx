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
  isActive?: boolean;
  onClick?: () => void;
  subItems?: SubItem[];
  defaultExpanded?: boolean;
}

export function SidebarNavItem({
  icon,
  label,
  isActive = false,
  onClick,
  subItems = [],
  defaultExpanded = false,
}: SidebarNavItemProps) {
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
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
          isActive
            ? "bg-[#F1F6FF] text-[#345794]"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
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
        <div className="relative pl-4 sm:pl-6">
          {/* Dotted vertical line */}
          <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-px border-l-2 border-dotted border-white/30"></div>
          
          <div className="space-y-0">
            {subItems.map((subItem, index) => (
              <div
                key={index}
                className={`relative flex items-center gap-3 pl-6 pr-4 py-2 cursor-pointer transition-colors ${
                  subItem.isActive
                    ? "bg-white/10 text-blue-300 border-l-2 border-blue-300"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
                onClick={subItem.onClick}
              >
                {/* Dotted horizontal line */}
                <div className="absolute left-6 sm:left-2 w-4 h-px border-t-2 border-dotted border-white/30"></div>

 {/* <div className="absolute left-6 w-4 h-px border-t-2 border-dotted border-white/30"></div> */}
                <div className="flex items-center gap-2">
                  <span className="text-sm">{subItem.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
