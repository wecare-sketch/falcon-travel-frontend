import { useState } from "react";
import { PageHeader } from "../PageHeader"
import { SearchFilters } from "../SearchFilter"
import { EventCard } from "../UpcomingEvents/EventCard"
import AddFeedback from "./AddFeedback";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const events = [
    {
      id: 1,
      title: "Annual Corporate Gala",
      date: "Dec 15, 2023",
      imageUrl: "/images/Clip path group.png?height=212&width=288",
      rating: 3.7,
      totalReviews: 10,
      lastReviewDate: "Feb 26, 2025",
    },
    {
      id: 2,
      title: "Annual Corporate Gala",
      date: "Dec 15, 2023",
      imageUrl: "/images/Clip path group.png?height=212&width=288",
      rating: 3.7,
      totalReviews: 15,
      lastReviewDate: "Mar 01, 2025",
    },
  ];

export function FeedBackPage(){
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const role = useSelector((state: RootState) => state.userRole.role);

    const handleViewDetails = (eventId: number) => {
        setSelectedEventId(eventId);
      };
      if (selectedEventId !== null) {
        return <AddFeedback eventId={selectedEventId}/>;
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
            rating={event.rating}
            totalReviews={event.totalReviews}
            lastReviewDate={event.lastReviewDate}
            onViewDetails={() => handleViewDetails(event.id)}
            Label={role==="user"?"Add Your Feedback":"View Details"}
          />
        ))}
        </div>
        </>
    )
}