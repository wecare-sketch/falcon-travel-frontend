"use client";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { X, Plus, Headphones } from "lucide-react";
import Image from "next/image";

interface AddMusicModalProps {
  open: boolean;
  onClose: () => void;
  onAddMusic?: (platform: string, link?: string) => void;
}

export function AddMusicModal({
  open,
  onClose,
  onAddMusic,
}: Readonly<AddMusicModalProps>) {
  const handleAddNewLink = () => {
    // This would typically open a form to add a new music link
    console.log("Add new music link");
  };

  const handlePlatformClick = (platform: string) => {
    console.log(`Selected platform: ${platform}`);
    onAddMusic?.(platform);
  };

  const handleUploadMusic = () => {
    console.log("Upload music");
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "24px",
          minHeight: "500px",
          maxWidth: "900px",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          paddingBottom: "16px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#345794",
            fontWeight: 600,
            fontSize: "24px",
          }}
        >
          Add music
        </Typography>
        <IconButton onClick={onClose} sx={{ padding: "4px" }}>
          <X className="w-6 h-6 text-gray-600" />
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: "0", overflow: "visible" }}>
        {/* Add New Music Link Button */}
        <Box
          sx={{
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleAddNewLink}
            sx={{
              width: "320px",
              height: "56px",
              border: "2px dashed #E0E0E0",
              borderRadius: "8px",
              color: "#666",
              backgroundColor: "transparent",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 500,
              "&:hover": {
                border: "2px dashed #4A5F8A",
                backgroundColor: "transparent",
                color: "#4A5F8A",
              },
            }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Music Link
          </Button>
        </Box>

        {/* Platform Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            marginBottom: "48px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => handlePlatformClick("YouTube")}
            sx={{
              minWidth: "120px",
              height: "32px",
              borderColor: "#D9D9D9",
              color: "#000000",
              opacity: "88%",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#4A5F8A",
                color: "#4A5F8A",
                backgroundColor: "transparent",
              },
            }}
          >
            <Image
              src="/images/youtube.png"
              alt="YouTube"
              width={16}
              height={16}
              style={{
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            YouTube
          </Button>

          <Button
            variant="outlined"
            onClick={() => handlePlatformClick("Spotify")}
            sx={{
              minWidth: "120px",
              height: "32px",
              borderColor: "#D9D9D9",
              color: "#000000",
              opacity: "88%",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#4A5F8A",
                color: "#4A5F8A",
                backgroundColor: "transparent",
              },
            }}
          >
            <Image
              src="/images/spotify.png"
              alt="Spotify"
              width={16}
              height={16}
              style={{
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            Spotify
          </Button>

          <Button
            variant="outlined"
            onClick={() => handlePlatformClick("Apple Music")}
            sx={{
              minWidth: "120px",
              height: "32px",
              borderColor: "#D9D9D9",
              color: "#000000",
              opacity: "88%",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#4A5F8A",
                color: "#4A5F8A",
                backgroundColor: "transparent",
              },
            }}
          >
            <Image
              src="/images/applemusic.png"
              alt="Apple Music"
              width={16}
              height={16}
              style={{
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            Apple Music
          </Button>

          <Button
            variant="outlined"
            onClick={() => handlePlatformClick("SoundCloud")}
            sx={{
              minWidth: "120px",
              height: "32px",
              borderColor: "#D9D9D9",
              color: "#000000",
              opacity: "88%",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#4A5F8A",
                color: "#4A5F8A",
                backgroundColor: "transparent",
              },
            }}
          >
            <Image
              src="/images/soundcloud.png"
              alt="SoundCloud"
              width={16}
              height={16}
              style={{
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            SoundCloud
          </Button>

          <Button
            variant="outlined"
            onClick={() => handlePlatformClick("Browser")}
            sx={{
              minWidth: "120px",
              height: "32px",
              borderColor: "#D9D9D9",
              color: "#000000",
              opacity: "88%",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#4A5F8A",
                color: "#4A5F8A",
                backgroundColor: "transparent",
              },
            }}
          >
            <Image
              src="/images/browser.png"
              alt="Browser"
              width={16}
              height={16}
              style={{
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            Browser
          </Button>
        </Box>

        {/* Empty State */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <Headphones className="w-10 h-10 text-[#4A5F8A]" />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontWeight: 600,
              fontSize: "18px",
              marginBottom: "8px",
            }}
          >
            No music links added yet
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#000000",
              opacity: "45%",
              fontSize: "14px",
              maxWidth: "350px",
            }}
          >
            Add your first music link by clicking the button above
          </Typography>
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
          onClick={handleCancel}
          sx={{
            color: "#345794",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "16px",
            padding: "8px 24px",
            borderRadius: "6px",
            "&:hover": {
              borderColor: "#4A5F8A",
              color: "#4A5F8A",
              backgroundColor: "transparent",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUploadMusic}
          sx={{
            backgroundColor: "#345794",
            color: "white",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "16px",
            padding: "8px 24px",
            borderRadius: "6px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#3A4F7A",
              boxShadow: "none",
            },
          }}
        >
          Upload Music
        </Button>
      </DialogActions>
    </Dialog>
  );
}
