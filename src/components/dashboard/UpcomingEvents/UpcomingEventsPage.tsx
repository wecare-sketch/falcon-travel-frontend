import { useSelector } from "react-redux";
import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { EventCard } from "./EventCard";
import { SearchFilters } from "../SearchFilter";
import { CreateEventCard } from "./CreateEventCard";
import { EventDetailsPage } from "../EventDetails/EventDetailPage";
import { RootState } from "@/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";

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

const admin_events=[
  {
    id: 1,
    title: "Newyork Trip",
    date: "12-23-2025",
    passenger: "09",
    remainingAmount: "00$",
    paymentStatus: "Paid",
    clientName: "John Doe",
  },
  {
    id: 2,
    title: "Newyork Trip",
    date: "12-23-2025",
    passenger: "23",
    remainingAmount: "200$",
    paymentStatus: "Pending",
    clientName: "John Doe",
  },
  {
    id: 3,
    title: "Newyork Trip",
    date: "12-23-2025",
    passenger: "24",
    remainingAmount: "00$",
    paymentStatus: "Paid",
    clientName: "John Doe",
  },
  {
    id: 4,
    title: "Newyork Trip",
    date: "12-23-2025",
    passenger: "30",
    remainingAmount: "00$",
    paymentStatus: "Paid",
    clientName: "John Doe",
  },
  {
    id: 3,
    title: "Newyork Trip",
    date: "12-23-2025",
    passenger: "24",
    remainingAmount: "00$",
    paymentStatus: "Paid",
    clientName: "John Doe",
  },
  {
    id: 4,
    title: "Newyork Trip",
    date: "12-23-2025",
    passenger: "30",
    remainingAmount: "00$",
    paymentStatus: "Paid",
    clientName: "John Doe",
  },
]

const PAGE_SIZE = 4;

interface UpcomingEventsPageProps {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

export function UpcomingEventsPage({
  setIsCreateModalOpen,
}: Readonly<UpcomingEventsPageProps>) {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const role = useSelector((state: RootState) => state.userRole.role);
  const [page, setPage] = useState(1);
  const handleViewDetails = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  const paginatedEvents = admin_events.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(admin_events.length / PAGE_SIZE);

  if (selectedEventId !== null) {
    return <EventDetailsPage eventId={selectedEventId} />;
  }

  return (
    <div>
      <PageHeader title="List of Events" />
      <SearchFilters />
      {role === "admin" ? (
        <div className="p-4">
          <div className="flex justify-end mb-3">
            <button
              className="bg-[#345794] text-white rounded px-6 py-2 font-semibold text-base"
              onClick={handleCreateEvent}
            >
              + Create Event
            </button>
          </div>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F8F9FB] text-[#00000080]">
                  <th className="py-3 px-2 font-semibold text-center"><input type="checkbox" /></th>
                  <th className="py-3 px-2 font-semibold text-center">No..</th>
                  <th className="py-3 px-2 font-semibold text-center">Event Name</th>
                  <th className="py-3 px-2 font-semibold text-center">Date</th>
                  <th className="py-3 px-2 font-semibold text-center">Passenger</th>
                  <th className="py-3 px-2 font-semibold text-center">Remaining Amount</th>
                  <th className="py-3 px-2 font-semibold text-center">Payment Status</th>
                  <th className="py-3 px-2 font-semibold text-center">Client Name</th>
                  <th className="py-3 px-2 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEvents.map((event, idx) => (
                  <tr
                    key={event.id}
                    className={idx % 2 === 1 ? "bg-[#F3F6F9] text-center" : "bg-white text-center"}
                  >
                    <td className="py-2 px-2"><input type="checkbox" /></td>
                    <td className="py-2 px-2">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                    <td className="py-2 px-2">{event.title}</td>
                    <td className="py-2 px-2">{event.date}</td>
                    <td className="py-2 px-2">{event.passenger}</td>
                    <td className="py-2 px-2">{event.remainingAmount}</td>
                    <td className="py-2 px-2">
                      <span
                        className={`px-4 py-1 rounded-lg font-semibold ${
                          event.paymentStatus === "Paid"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {event.paymentStatus}
                      </span>
                    </td>
                    <td className="py-2 px-2">{event.clientName}</td>
                    <td className="py-2 px-2">
                      <DescriptionIcon className="cursor-pointer mr-2 text-[#C2C9D1]" />
                      <EditIcon className="cursor-pointer mr-2 text-[#C2C9D1]" />
                      <DeleteIcon className="cursor-pointer text-[#C2C9D1]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border border-[#d1d5db] bg-white text-[#345794] rounded px-3 py-1 font-semibold text-base min-w-[36px] disabled:opacity-50"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`border px-3 py-1 font-semibold text-base min-w-[36px] rounded ${
                  page === i + 1
                    ? "bg-[#345794] text-white border-[#345794]"
                    : "bg-white text-[#345794] border-[#d1d5db]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="border border-[#d1d5db] bg-white text-[#345794] rounded px-3 py-1 font-semibold text-base min-w-[36px] disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              imageUrl={event.imageUrl}
              Label="View Details"
              onViewDetails={() => handleViewDetails(event.id)}
            />
          ))}
          <CreateEventCard onCreateEvent={handleCreateEvent} />
        </div>
      )}

    </div>
  );
}
