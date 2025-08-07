"use client";

import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { SettingsDrawer } from "./Settings";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

interface HeaderProps {
  title: string;
  userName: string;
  userAvatar?: string;
  onToggleSidebar?: () => void;
}

export function Header({
  title,
  userName,
  userAvatar,
  onToggleSidebar,
}: Readonly<HeaderProps>) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleProfileClick = () => {
    setIsSettingsOpen(true)
  }

  const handleCloseSettings = () => {
    setIsSettingsOpen(false)
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #FFFFFF 0%, #DEDEDE 100%)",
          borderBottom: "1px solid #e0e0e0",
          px: { xs: 2, md: 4 },
          py: 2,
        }}
      >
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {/* Left: Hamburger + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={onToggleSidebar}
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#000" }}
            >
              <Menu size={24} />
            </IconButton>

            <Image
              src="/images/alligned-transparent-logo-200-x-70-px-1-1-ezgif.com-webp-to-png-converter 1.png"
              alt="Falcon Tour Travel"
              width={200}
              height={70}
              style={{ width: "200px", height: "70px", objectFit: "contain" }}
              priority
            />
          </Box>

          {/* Center: Title (only on md+) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "start",
              pl: 6,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                color: "#000",
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Right: Avatar and Notification */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Mobile Avatar */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1,
              cursor: "pointer"
              }}
              onClick={handleProfileClick}
            >
              <Avatar
                alt={userName}
                src={userAvatar ?? "/images/avatar.png"}
                sx={{ width: 34, height: 34 }}
              />
              <ChevronDown size={16} color="#9e9e9e" />
            </Box>

            {/* Desktop: Notification + User info */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Image
                src="/images/Notification.png"
                alt="Notifications"
                width={24}
                height={24}
                style={{ width: 24, height: 24, cursor: "pointer" }}
                priority
              />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1,cursor:"pointer" }} onClick={handleProfileClick}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#000",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {userName}
                </Typography>
                <Avatar
                  alt={userName}
                  src={userAvatar ?? "/images/avatar.png"}
                  sx={{ width: 38, height: 38, cursor: "pointer" }}
                />
                <ChevronDown
                  size={16}
                  color="#9e9e9e"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <SettingsDrawer
        open={isSettingsOpen}
        onClose={handleCloseSettings}
        userName={userName}
      userEmail="james.watson@example.com"
        userAvatar={userAvatar}
      />
    </>
  );
}
