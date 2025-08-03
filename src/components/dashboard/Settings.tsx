"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { ChevronRight, Bell, ChevronLeft, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

export function SettingsDrawer({
  open,
  onClose,
  userName,
  userEmail,
  userAvatar,
}: SettingsDrawerProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();

  const handleAccountSettings = () => {
    console.log("Navigate to Account Settings");
  };

  const handleSecuritySettings = () => {
    console.log("Navigate to Security Settings");
  };

  const handlePushNotificationsToggle = () => {
    console.log("Toggle Push Notifications");
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    handleLogout();
  };
  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/sign-in");
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 320 }, // Full width on mobile, 320px on larger screens
          maxWidth: 320,
          backgroundColor: "#FFFFFF",
          boxShadow: "-4px 0px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: { xs: "12px 16px", sm: "16px 20px" }, // Less padding on mobile
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <IconButton
              onClick={onClose}
              sx={{
                width: 32,
                height: 32,
                padding: 0,
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
              }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "16px", sm: "18px" }, // Smaller on mobile
                fontWeight: 600,
                color: "#333",
              }}
            >
              Settings
            </Typography>
          </Box>

          <Avatar
            src={userAvatar || "/images/group.png"}
            sx={{
              width: 32,
              height: 32,
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, padding: { xs: "16px 16px", sm: "24px 20px" } }}>
          {/* Account Settings Section */}
          <Box sx={{ marginBottom: "32px" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "14px", sm: "16px" }, // Smaller on mobile
                fontWeight: 600,
                color: "#333",
                marginBottom: "16px",
              }}
            >
              Account Settings
            </Typography>

            <List sx={{ padding: 0 }}>
              {/* User Profile */}
              <ListItem
                onClick={handleAccountSettings}
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  background: "#F9FAFB",
                  marginBottom: "5px",
                  "&:hover": {
                    backgroundColor: "#F8F9FA",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Image
                    src="/images/emptyprofile.png"
                    width="24"
                    height="24"
                    alt="profile"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: { xs: "13px", sm: "14px" }, // Smaller text on mobile
                        fontWeight: 500,
                        color: "#333",
                        marginBottom: "2px",
                      }}
                    >
                      {userName}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", sm: "12px" }, // Smaller text on mobile
                        color: "#666",
                      }}
                    >
                      {userEmail}
                    </Typography>
                  }
                />
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </ListItem>

              {/* Security Settings */}
              <ListItem
                onClick={handleSecuritySettings}
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  background: "#F9FAFB",
                  "&:hover": {
                    backgroundColor: "#F8F9FA",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src="/images/lock.png"
                      width="24"
                      height="24"
                      alt="profile"
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      Security Settings
                    </Typography>
                  }
                />
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </ListItem>
            </List>
          </Box>

          {/* Notifications Section */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "14px", sm: "16px" }, // Smaller on mobile
                fontWeight: 600,
                color: "#333",
                marginBottom: "16px",
              }}
            >
              Notifications
            </Typography>

            <List sx={{ padding: 0 }}>
              {/* Push Notifications */}
              <ListItem
                sx={{
                  padding: "12px 0",
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Bell className="w-4 h-4 text-[#4A5F8A]" />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      Push Notifications
                    </Typography>
                  }
                />
                <Switch
                  defaultChecked
                  onChange={handlePushNotificationsToggle}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#345794",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#345794",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#345794",
                    },
                  }}
                />
              </ListItem>
              <ListItem
                onClick={handleLogoutClick}
                sx={{
                  padding: "12px 0",
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                  </Box>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#333",
                        }}
                      >
                        Logout
                      </Typography>
                    }
                  />
                </ListItemIcon>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleCancelLogout}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}
