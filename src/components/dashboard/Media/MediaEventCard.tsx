"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Video } from "lucide-react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axios";

interface MediaEventCardProps {
  eventId: string;
  name: string;
  pickupDate: string | number;
  imageUrl: string;
  badgeCount?: number;
  onAddMedia?: () => void;
}
interface EventMediaResponse {
  data: {
    event: {
      media: [];
    };
    media: [];
  };
}
export function MediaEventCard({
  eventId,
  name,
  pickupDate,
  imageUrl,
  badgeCount,
  onAddMedia,
}: MediaEventCardProps) {
  const role = useSelector((state: RootState) => state.userRole.role);
  interface MediaItem {
    url: string;
  }
  const [UserMedia, setUserMedia] = useState<MediaItem[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const isPhoto = (url: string): boolean => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
  };

  const isVideo = (url: string): boolean => {
    return /\.(mp4|mov|avi|webm)$/i.test(url);
  };

  const fetchUservents = useCallback(async () => {
    try {
      const endpoint =
        role === "user"
          ? `/user/event/media/${eventId}`
          : `/admin/event/media/${eventId}`;

      const response = await axiosInstance.get<EventMediaResponse>(endpoint);

      let media;
      if (role === "user") {
        media = response?.data?.data?.event?.media;
      } else if (role === "admin") {
        media = response?.data?.data?.media;
      }

      setUserMedia(media || []);
    } catch (error) {
      console.error("Error fetching event media:", error);
    }
  }, [eventId, role]); // dependencies here

  useEffect(() => {
    fetchUservents();
  }, [fetchUservents]);

  useEffect(() => {
    const photos = UserMedia.filter((item) => isPhoto(item.url)).length;
    const videos = UserMedia.filter((item) => isVideo(item.url)).length;

    setPhotoCount(photos);
    setVideoCount(videos);
  }, [UserMedia]);

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
      <Box sx={{ position: "relative", height: 250, margin: 2 }}>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="img"
          fill
          style={{ objectFit: "cover", borderRadius: "8px" }}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            marginBottom: "4px",
            color: "#333",
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6B7280",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          <strong>Pickup date:</strong>{" "}
          {typeof pickupDate === "string"
            ? pickupDate.split("-").reverse().join("-")
            : pickupDate}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: "12px",
            columnGap: "16px",
            marginBottom: "0px",
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
            {role === "user" ? "Add Media" : "Download"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
