"use client";

import { useState, type FC } from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import Image from "next/image";

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  role?: "admin" | "user";
}

interface SubNavItem {
  label: string;
  view: string;
}

interface NavItem {
  label: string;
  icon: React.ReactElement;
  view: string;
  subItems?: SubNavItem[];
}

const drawerWidth = 258;

const NAV_ITEMS: {
  admin: NavItem[];
  common: NavItem[];
} = {
  admin: [
    {
      label: "Dashboard",
      icon: (
        <Image
          src="/images/dashboard.png"
          alt="Dashboard"
          width={20}
          height={20}
        />
      ),
      view: "Dashboard",
    },
  ],
  common: [
    {
      label: "Events",
      icon: (
        <Image src="/images/calendar.png" alt="Events" width={20} height={20} />
      ),
      view: "Events",
      subItems: [
        { label: "Upcoming Events", view: "Upcoming Events" },
        { label: "Music Library", view: "Music Library" },
        { label: "Media", view: "Media" },
      ],
    },
    {
      label: "Feedback",
      icon: (
        <Image
          src="/images/feedback.png"
          alt="Feedback"
          width={20}
          height={20}
        />
      ),
      view: "Feedback",
    },
  ],
};

export const Sidebar: FC<Readonly<SidebarProps>> = ({
  isMobileOpen,
  onClose,
  onNavigate,
  role = "user",
}) => {
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const handleNavClick = (view: string, subItems?: SubNavItem[]) => {
    if (subItems?.length) {
      const firstSub = subItems[0];
      setActiveSubItem(firstSub.view);
      onNavigate(firstSub.view);
    } else {
      setActiveSubItem(null);
      onNavigate(view);
    }

    onClose();
  };

  const handleSubNavClick = (subView: string) => {
    setActiveSubItem(subView);
    onNavigate(subView);
    onClose();
  };

  const renderNavItems = () => {
    const items = [
      ...(role === "admin" ? NAV_ITEMS.admin : []),
      ...NAV_ITEMS.common,
    ];

    return items.map(({ label, icon, view, subItems }) => (
      <SidebarNavItem
        key={label}
        icon={icon}
        label={label}
        onClick={() => handleNavClick(view, subItems)}
        defaultExpanded={view === "Events"}
        subItems={
          subItems?.map((sub) => ({
            label: sub.label,
            isActive: activeSubItem === sub.view,
            onClick: () => handleSubNavClick(sub.view),
          })) ?? []
        }
      />
    ));
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        bgcolor: "#345794",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end p-4">
        <IconButton onClick={onClose}>
          <X className="w-6 h-6 text-white" />
        </IconButton>
      </div>

      <nav className="flex-1">
        <div className="space-y-1">{renderNavItems()}</div>
      </nav>
    </Box>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#345794",
              borderRight: "none",
              top: "102px",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: "70%",
              backgroundColor: "#345794",
              borderRight: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </div>
    </>
  );
};
