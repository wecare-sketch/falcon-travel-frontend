"use client"

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
} from "@mui/material"
import { LinkIcon } from "lucide-react"
import { useState } from "react"


interface ShareEventModalProps {
  open: boolean
  onClose: () => void
  eventTitle?: string
}

interface SharedUser {
  id: string
  name: string
  email: string
  status: string
  avatar: string
}

export function ShareEventModal({ open, onClose, eventTitle = "New Event" }: ShareEventModalProps) {
  const [email, setEmail] = useState("")
  const [userStatus, setUserStatus] = useState("")
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([
    {
      id: "1",
      name: "Waheed Khan",
      email: "waheed@example.com",
      status: "Host",
      avatar: "W",
    },
  ])

  const handleCopyLink = () => {
    // Copy event link to clipboard
    const eventLink = `https://falcon-tour.com/events/${eventTitle.toLowerCase().replace(/\s+/g, "-")}`
    navigator.clipboard.writeText(eventLink)
    console.log("Link copied to clipboard:", eventLink)
  }

  const handleInvite = () => {
    if (email.trim() && userStatus) {
      const newUser: SharedUser = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email: email,
        status: userStatus,
        avatar: email.charAt(0).toUpperCase(),
      }
      setSharedUsers([...sharedUsers, newUser])
      setEmail("")
      setUserStatus("")
    }
  }

  const handleRemoveUser = (userId: string) => {
    setSharedUsers(sharedUsers.filter((user) => user.id !== userId))
  }

  const handleShareInvite = () => {
    console.log("Sharing invites to:", sharedUsers)
    onClose()
  }

  const handleCancel = () => {
    setEmail("")
    setUserStatus("")
    onClose()
  }

  return (
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

        <Button
          variant="text"
          onClick={handleCopyLink}
          startIcon={<LinkIcon className="w-4 h-4" />}
          sx={{
            color: "#666",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          Copy Link
        </Button>
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
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
  )
}
