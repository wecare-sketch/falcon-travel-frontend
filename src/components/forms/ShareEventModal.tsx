"use client";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Divider,
} from "@mui/material";
import { useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

interface ShareEventModalProps {
  open: boolean;
  onClose: () => void;
  slug: string;
}

interface SharedUser {
  id: string;
  name: string;
  email: string;
  status: string;
  avatar: string;
}

interface ShareInviteResponse {
  message: string;
  data: {
    url: string;
  };
}

export function ShareEventModal({
  open,
  onClose,
  slug,
}: ShareEventModalProps) {
  const [email, setEmail] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);
  const [inviteUrl, setInviteUrl] = useState("");
  const [showCopyModal, setShowCopyModal] = useState(false);

  const handleInvite = () => {
    if (email.trim() && userStatus) {
      const newUser: SharedUser = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email: email,
        status: userStatus,
        avatar: email.charAt(0).toUpperCase(),
      };
      setSharedUsers([...sharedUsers, newUser]);
      setEmail("");
      setUserStatus("");
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSharedUsers(sharedUsers.filter((user) => user.id !== userId));
  };

  const handleShareInvite = async () => {
    try {
      const payload = {
        host: sharedUsers.find((user) => user.status === "Host")?.email || "",
        cohosts: sharedUsers
          .filter((user) => user.status === "Co-Host")
          .map((user) => user.email),
        slug,
      };

      const response = await axios.post<ShareInviteResponse>(
        `/admin/event/${slug}/create`,
        payload
      );
      const inviteLink = response.data.data.url;

      setInviteUrl(inviteLink);
      onClose();
      setEmail("");
      setShowCopyModal(true);
      toast.success("Event invite shared successfully");
    } catch {
      toast.error("Failed to share invite");
    }
  };

  const handleCancel = () => {
    setEmail("");
    setUserStatus("");
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "24px",
            minHeight: "400px",
            maxWidth: "500px",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            paddingBottom: "16px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Share the Event
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: "24px" }} />

        <DialogContent sx={{ padding: "0", overflow: "visible" }}>
          {/* Invite Section */}
          <Box sx={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            <TextField
              fullWidth
              placeholder="Enter the Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4A5F8A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4A5F8A",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 16px",
                  fontSize: "14px",
                  "&::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                },
              }}
            />

            <FormControl
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4A5F8A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4A5F8A",
                  },
                },
              }}
            >
              <InputLabel
                sx={{
                  color: "#999",
                  fontSize: "14px",
                  "&.Mui-focused": {
                    color: "#4A5F8A",
                  },
                }}
              >
                User Status
              </InputLabel>
              <Select
                value={userStatus}
                label="User Status"
                onChange={(e) => setUserStatus(e.target.value)}
                sx={{
                  fontSize: "14px",
                }}
              >
                <MenuItem value="Host">Host</MenuItem>
                <MenuItem value="Co-Host">Co-Host</MenuItem>
                <MenuItem value="Guest">Guest</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleInvite}
              disabled={!email.trim() || !userStatus}
              sx={{
                backgroundColor: "#E0E0E0",
                color: "#666",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                padding: "12px 24px",
                borderRadius: "8px",
                boxShadow: "none",
                minWidth: "80px",
                "&:hover": {
                  backgroundColor: "#D0D0D0",
                  boxShadow: "none",
                },
                "&:disabled": {
                  backgroundColor: "#F0F0F0",
                  color: "#999",
                },
              }}
            >
              Invite
            </Button>
          </Box>

          {/* Who has access section */}
          <Box sx={{ marginBottom: "32px" }}>
            <Typography
              variant="body1"
              sx={{
                color: "#333",
                fontSize: "16px",
                fontWeight: 500,
                marginBottom: "16px",
              }}
            >
              Who has access
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sharedUsers.map((user) => (
                <Box
                  key={user.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 0",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#FF6B6B",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {user.avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#333",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {user.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "12px",
                        }}
                      >
                        {user.status}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="text"
                    onClick={() => handleRemoveUser(user.id)}
                    sx={{
                      color: "#666",
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      minWidth: "auto",
                      padding: "4px 8px",
                      "&:hover": {
                        backgroundColor: "#F5F5F5",
                        color: "#FF4444",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        {/* Footer Buttons */}
        <DialogActions
          sx={{
            padding: "0",
            paddingTop: "24px",
            borderTop: "1px solid #E0E0E0",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <Button
            variant="text"
            onClick={handleCancel}
            sx={{
              color: "#666",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 24px",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleShareInvite}
            sx={{
              backgroundColor: "#4A5F8A",
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 24px",
              borderRadius: "8px",
              boxShadow: "none",
              minWidth: "120px",
              "&:hover": {
                backgroundColor: "#3A4F7A",
                boxShadow: "none",
              },
            }}
          >
            Share Invite
          </Button>
        </DialogActions>
      </Dialog>

      {/*Copy link*/}
      <Dialog
        open={showCopyModal}
        onClose={() => setShowCopyModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "24px",
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Invite Link
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              value={inviteUrl}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#F5F5F5",
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                  },
                },
              }}
            />

            <Button
              variant="outlined"
              onClick={() => {
                navigator.clipboard.writeText(inviteUrl);
                toast.success("Link copied!");
              }}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                padding: "10px 16px",
              }}
            >
              Copy Link
            </Button>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", mt: 2 }}>
          <Button
            onClick={() => setShowCopyModal(false)}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 24px",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
