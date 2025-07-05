"use client";

import Image from "next/image";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Video } from "lucide-react";
import { MediaUploadArea } from "./MediaUploadArea";

interface MediaEventCardProps {
  title: string;
  date: string;
  imageUrl: string;
  photoCount: number;
  videoCount: number;
  badgeCount?: number;
  onFileUpload?: (files: FileList) => void;
  onAddMedia?: () => void;
}

export function MediaEventCard({
  title,
  date,
  imageUrl,
  photoCount,
  videoCount,
  badgeCount,
  onFileUpload,
  onAddMedia,
}: MediaEventCardProps) {
  const handleFileUpload = (files: FileList) => {
    console.log(`Uploading ${files.length} files for ${title}`);
    onFileUpload?.(files);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "400px",
        boxShadow: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "visible",
      }}
    >
      {/* Event Image with Badge */}
      <Box sx={{ position: "relative", height: 200, margin: 2 }}>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
        {badgeCount && (
          <Box
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              backgroundColor: "#FF4444",
              color: "white",
              borderRadius: "12px",
              padding: "4px 8px",
              fontSize: "12px",
              fontWeight: "bold",
              minWidth: "26px",
              textAlign: "center",
            }}
          >
            {badgeCount}
          </Box>
        )}
      </Box>

      <CardContent sx={{ padding: "16px" }}>
        {/* Event Info */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            marginBottom: "4px",
            color: "#333",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6B7280",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          {date}
        </Typography>

        {/* Upload Area */}
        <MediaUploadArea onFileUpload={handleFileUpload} />

        {/* Media Stats */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: "12px",
            columnGap: "16px",
            marginBottom: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Image
                src="/images/imgicon.png"
                alt="img"
                width={15}
                height={15}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {photoCount} Photos
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Video className="w-4 h-4 text-gray-600" />
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {videoCount} Videos
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={onAddMedia}
            sx={{
              backgroundColor: "#345794",
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "6px 16px",
              borderRadius: "6px",
              boxShadow: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#3A4F7A",
                boxShadow: "none",
              },
            }}
          >
            Add Media
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
