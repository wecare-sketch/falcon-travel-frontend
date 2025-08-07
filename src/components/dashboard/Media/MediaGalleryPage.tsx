"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "../PageHeader";
import { MediaEventCard } from "./MediaEventCard";
import { Box } from "@mui/material";
import { MediaUploadPage } from "./AddMedia";
import axiosInstance from "@/lib/axios";
import { useSelector } from "react-redux";
import { SearchFilters } from "../SearchFilter";
import { RootState } from "@/store";

interface MediaGalleryPageProps {
  setActiveSubItem: (subItem: string | null) => void;
  setActiveView: (view: string) => void;
}
interface MediaEvent {
  id: number;
  name: string;
  title: string;
  pickupDate: string | number;
  imageUrl: string;
  badgeCount: number;
  slug: string;
}
export function MediaGalleryPage({
  setActiveSubItem,
  setActiveView,
}: MediaGalleryPageProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [mediaEvents, setmediaEvents] = useState<MediaEvent[]>([]);
const [SelectedEventid, setSelectedEventid] = useState<string>("")
  const role = useSelector((state: RootState) => state.userRole.role);
  const fetchUserEvents = async () => {
    let endpoint = "";
    if (role === "admin") {
      endpoint = "/admin/events";
    } else if (role === "user") {
      endpoint = "/user/events";
    } else {
      console.error("Invalid role");
      return;
    }

    try {
      const response = await axiosInstance.get<{
        data: { events: MediaEvent[] };
      }>(endpoint);
      setmediaEvents(response?.data?.data?.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

 

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const handleAddMedia = (eventId: string, eventid: string) => {
    setSelectedEventId(eventId);
    setSelectedEventid(eventid); 
  };
  const handlebackpage = () => {
    setSelectedEventId(null);
    setActiveView("Media");
  };
  if (selectedEventId !== null) {
    return (
      <MediaUploadPage
        onBack={handlebackpage}
        eventId={selectedEventId}
        eventid={SelectedEventid || ""}
      />
    );
  }
  const handleBack = () => {
    setActiveView("Dashboard");
    setActiveSubItem(null);
  };

  return (
    <>
      <PageHeader onBack={handleBack} title="Media Gallery" />
      <SearchFilters />
      
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
            eventId={event.id.toString()}
            name={event.name}
            pickupDate={event.pickupDate}
            imageUrl={event.imageUrl}
            badgeCount={undefined}
            onAddMedia={() => handleAddMedia(event.slug, event.id.toString())}
          />
        ))}
      </Box>
    </>
  );
}
