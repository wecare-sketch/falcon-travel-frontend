"use client";
import { useCallback, useEffect, useState } from "react";
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
interface SearchParams {
  search: string;
  host?: string;
  paymentStatus?: string;
}

interface EventResponse {
  data: {
    events: MediaEvent[];
  };
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
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [mediaEvents, setmediaEvents] = useState<MediaEvent[]>([]);
  const [SelectedEventid, setSelectedEventid] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<MediaEvent[]>([]);
  const role = useSelector((state: RootState) => state.userRole.role);

  const fetchUserEvents = useCallback(async () => {
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
  }, [role]);

  useEffect(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);

  const handleSearch = async (query: string, host: string, status: string) => {
    setHasSearched(true);
    try {
      const params: SearchParams = { search: query };

      if (host !== "allHost") params.host = host;
      if (status !== "allStatus") params.paymentStatus = status;

      let endpoint = "";
      if (role === "admin") endpoint = "/admin/events";
      else if (role === "user") endpoint = "/user/events";
      else {
        console.error("Invalid role");
        return;
      }

      const response = await axiosInstance.get<EventResponse>(endpoint, {
        params,
      });

      if (response?.data?.data?.events) {
        const mappedFilteredEvents = response.data.data.events.map((event) => ({
          id: event.id,
          name: event.name,
          title: event.name,
          pickupDate: event.pickupDate,
          imageUrl: event.imageUrl,
          badgeCount: event.badgeCount ?? 0,
          slug: event.slug,
        }));
        setFilteredEvents(mappedFilteredEvents);
      } else {
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  };

  const handleAddMedia = (eventId: string, eventid: string) => {
    setSelectedEventId(eventId);
    setSelectedEventid(eventid);
  };

  const handlebackpage = () => {
    setSelectedEventId(null);
    setActiveView("Media"); // back from upload to media grid
  };

  // ✅ Back from the media grid should go to the Music page
  const handleBack = () => {
    setActiveView("Music Library"); // <- use the parent's exact key
    setActiveSubItem(null);
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

  return (
    <>
      <PageHeader onBack={handleBack} title="Media Gallery" />
      <SearchFilters onSearch={handleSearch} />

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
        {hasSearched ? (
          filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <MediaEventCard
                key={event.id}
                eventId={event.id.toString()}
                name={event.name}
                pickupDate={event.pickupDate}
                imageUrl={event.imageUrl}
                badgeCount={event.badgeCount ?? undefined}
                onAddMedia={() =>
                  handleAddMedia(event.slug, event.id.toString())
                }
              />
            ))
          ) : (
            <div className="flex items-center top-1/2 justify-center absolute">
              <h1 className="text-black text-xl text-center">
                Result not found
              </h1>
            </div>
          )
        ) : (
          mediaEvents.map((event) => (
            <MediaEventCard
              key={event.id}
              eventId={event.id.toString()}
              name={event.name}
              pickupDate={event.pickupDate}
              imageUrl={event.imageUrl}
              badgeCount={event.badgeCount ?? undefined}
              onAddMedia={() => handleAddMedia(event.slug, event.id.toString())}
            />
          ))
        )}
      </Box>
    </>
  );
}
