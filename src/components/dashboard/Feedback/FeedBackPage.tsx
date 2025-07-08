import { useState } from "react";
import { PageHeader } from "../PageHeader"
import { SearchFilters } from "../SearchFilter"
import { EventCard } from "../UpcomingEvents/EventCard"

const events = [
    {
      id: 1,
      title: "Annual Corporate Gala",
      date: "Dec 15, 2023",
      imageUrl: "/images/Clip path group.png?height=212&width=288",
    },
    {
      id: 2,
      title: "Annual Corporate Gala",
      date: "Dec 15, 2023",
      imageUrl: "/images/Clip path group.png?height=212&width=288",
    },
  ];

export function FeedBackPage(){
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    const handleViewDetails = (eventId: number) => {
        setSelectedEventId(eventId);
      };
      if (selectedEventId !== null) {
        return <></>;
      }
    return(
        <>
        <PageHeader title="Add Event FeedBack" />
        <SearchFilters/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            imageUrl={event.imageUrl}
            onViewDetails={() => handleViewDetails(event.id)}
            Label="Add Your Feedback"
          />
        ))}
        </div>
        </>
    )
}