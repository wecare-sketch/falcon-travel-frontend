"use client";
import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { MediaEventCard } from "./MediaEventCard";
import { Box } from "@mui/material";
import { MediaUploadPage } from "./AddMedia";

const mediaEvents = [
  {
    id: 1,
    title: "Annual Corporate Gala",
    date: "Dec 15, 2023",
    imageUrl: "/images/media1.png?height=200&width=400",
    photoCount: 12,
    videoCount: 4,
    badgeCount: 24,
  },
  {
    id: 2,
    title: "Tech Conference 2023",
    date: "Dec 20, 2023",
    imageUrl: "/images/media2.png?height=200&width=400",
    photoCount: 12,
    videoCount: 4,
    badgeCount: 36,
  },
  {
    id: 3,
    title: "Holiday Celebration",
    date: "Dec 25, 2023",
    imageUrl: "/images/media3.png?height=200&width=400",
    photoCount: 12,
    videoCount: 4,
    badgeCount: 18,
  },
];
interface MediaGalleryPageProps {
  setActiveSubItem: (subItem: string | null) => void; 
  setActiveView: (view: string) => void; 
}
export function MediaGalleryPage({
  setActiveSubItem,
  setActiveView,
}: MediaGalleryPageProps) {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleFileUpload = (eventId: number, files: FileList) => {
    console.log(`Uploading ${files.length} files for event ${eventId}`);
    // Handle file upload logic here
  };

  const handleAddMedia = (eventId: number) => {
    setSelectedEventId(eventId);
    console.log("Add media for event:", eventId);
  };
  if (selectedEventId !== null) {
    return <MediaUploadPage />;
  }
  const handleBack = () => {
    setActiveView("Dashboard");
    setActiveSubItem(null); 
  };

  return (
    <>
      <PageHeader onBack={handleBack} title="Media Gallery" />
      <Box
        sx={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "16px",
          justifyItems: "center",
        }}
      >
        {mediaEvents.map((event) => (
          <MediaEventCard
            key={event.id}
            title={event.title}
            date={event.date}
            imageUrl={event.imageUrl}
            photoCount={event.photoCount}
            videoCount={event.videoCount}
            badgeCount={event.badgeCount}
            onFileUpload={(files) => handleFileUpload(event.id, files)}
            onAddMedia={() => handleAddMedia(event.id)}
          />
        ))}
      </Box>
    </>
  );
}
