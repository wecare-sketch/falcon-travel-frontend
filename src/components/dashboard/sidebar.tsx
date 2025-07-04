"use client";

import { Home, CalendarIcon, MessageSquare, X } from "lucide-react";
import { SidebarNavItem } from "./Sidebar-Nav-Item";
import { useState } from "react";

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void; // added prop for navigation
}

export function Sidebar({ isMobileOpen, onClose, onNavigate }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleNavClick = (item: string) => {
    setActiveItem(item);
    onNavigate(item); // notify parent about main nav
    onClose(); // optional: close sidebar on mobile after navigation
    console.log(`Navigating to ${item}`);
  };

  const handleSubNavClick = (subItem: string) => {
    onNavigate(subItem); // notify parent about sub-nav
    onClose();
    console.log(`Navigating to ${subItem}`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full bg-[#345794] text-white transition-transform duration-300
          ${isMobileOpen ? "translate-x-0 w-full" : "-translate-x-full w-0"}
          md:relative md:translate-x-0 md:w-[258px] md:h-auto
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Close button for mobile */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={onClose}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <nav className="flex-1">
            <div className="space-y-1">
              <SidebarNavItem
                icon={<CalendarIcon className="w-5 h-5" />}
                label="Events"
                isActive={activeItem === "Events"}
                defaultExpanded={true}
                onClick={() => handleNavClick("Events")}
                subItems={[
                  {
                    label: "Upcoming Events",
                    isActive: false,
                    onClick: () => handleSubNavClick("Upcoming Events"),
                  },
                  {
                    label: "Music Library",
                    onClick: () => handleSubNavClick("Music Library"),
                  },
                  {
                    label: "Media",
                    onClick: () => handleSubNavClick("Media"),
                  },
                ]}
              />

              <SidebarNavItem
                icon={<MessageSquare className="w-5 h-5" />}
                label="Feedback"
                isActive={activeItem === "Feedback"}
                onClick={() => handleNavClick("Feedback")}
              />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
