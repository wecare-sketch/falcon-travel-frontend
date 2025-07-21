
import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { SearchFilters } from "../SearchFilter";
import { EventDetailsPage } from "../EventDetails/EventDetailPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { useIsMobile } from "@/hooks/useIsMobile";



const admin_events = [
    {
        id: 1,
        title: "Newyork Trip",
        date: "12-23-2025",
        passenger: "09",
        location: "476 5th Ave, New York, NY ",
        clientName: "John Doe",
    },
    {
        id: 2,
        title: "Newyork Trip",
        date: "12-23-2025",
        passenger: "23",
        location: "2476 5th Ave, New York, NY ",
        clientName: "John Doe",
    },
    {
        id: 3,
        title: "Newyork Trip",
        date: "12-23-2025",
        passenger: "24",
        location: "476 5th Ave, New York, NY ",
        clientName: "John Doe",
    },
    {
        id: 4,
        title: "Newyork Trip",
        date: "12-23-2025",
        passenger: "30",
        location: "476 5th Ave, New York, NY ",
        clientName: "John Doe",
    },
    {
        id: 3,
        title: "Newyork Trip",
        date: "12-23-2025",
        passenger: "24",
        location: "476 5th Ave, New York, NY ",
        clientName: "John Doe",
    },
    {
        id: 4,
        title: "Newyork Trip",
        date: "12-23-2025",
        passenger: "30",
        location: "476 5th Ave, New York, NY ",
        clientName: "John Doe",
    },
]

const PAGE_SIZE = 4;

interface UserRequestsPage {
    setIsCreateModalOpen: (isOpen: boolean) => void;
}

function UserRequestMobileListItem({
  eventName,
  clientName,
  passenger,
  date,
  location,
  onEdit,
  onDelete,
}: {
  eventName: string;
  clientName: string;
  passenger: number;
  date: string;
  location: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, boxShadow: '0px 1px 3px rgba(0,0,0,0.1)', border: '1px solid #E0E0E0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <EditIcon style={{ cursor: 'pointer', marginBottom: 4, color: '#6B7280' }} onClick={onEdit} />
        <DeleteIcon style={{ cursor: 'pointer', color: '#6B7280' }} onClick={onDelete} />
      </div>
      <div style={{ marginBottom: 8, paddingRight: 80 }}>
        <strong>Event Name:</strong> {eventName}
      </div>
      <div style={{ marginBottom: 8, paddingRight: 80 }}>
        <strong>Client Name:</strong> {clientName}
      </div>
      <div style={{ marginBottom: 8, paddingRight: 80 }}>
        <strong>Location:</strong> {location}
      </div>
      <div style={{ display: 'flex', gap: 24, paddingRight: 80 }}>
        <div>
          <strong>Passenger:</strong> {passenger}
        </div>
        <div>
          <strong>Date:</strong> {date}
        </div>
      </div>
    </div>
  );
}

export function UserRequestsPage({
    setIsCreateModalOpen,
}: Readonly<UserRequestsPage>) {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
  const isMobile = useIsMobile()
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
            {isMobile?
            (<div>
                {paginatedEvents.map((event) => (
                  <UserRequestMobileListItem
                    key={event.id}
                    eventName={event.title}
                    clientName={event.clientName}
                    passenger={parseInt(event.passenger, 10) || 0}
                    date={event.date}
                    location={event.location}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                ))}
                {/* Pagination for mobile */}
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
                          ? "bg-white text-[#345794] border-[#345794]"
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
              </div>)
            :
            (
                <div className="p-4">
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full border border-gray-300 border-collapse text-sm">
                        <thead>
                            <tr className="bg-[#F8F9FB] text-[#00000080]">
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                                    <input type="checkbox" />
                                </th>
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">No..</th>
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">Event Name</th>
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">Date</th>
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">Passenger</th>
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">Location</th>
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">Client Name</th>
                                <th className="py-3 px-2 font-semibold text-center border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEvents.map((event, idx) => (
                                <tr
                                    key={event.id}
                                    className={idx % 2 === 1 ? "bg-[#F3F6F9] text-center text-black" : "bg-white text-center text-black"}
                                >
                                    <td className="py-2 px-2 border border-gray-300">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="py-2 px-2 border border-gray-300">
                                        {(page - 1) * PAGE_SIZE + idx + 1}
                                    </td>
                                    <td className="py-2 px-2 border border-gray-300">{event.title}</td>
                                    <td className="py-2 px-2 border border-gray-300">{event.date}</td>
                                    <td className="py-2 px-2 border border-gray-300">{event.passenger}</td>
                                    <td className="py-2 px-2 border border-gray-300">{event.location}</td>
                                    <td className="py-2 px-2 border border-gray-300">{event.clientName}</td>
                                    <td className="py-2 px-2 border border-gray-300">
                                        <DescriptionIcon
                                            className="cursor-pointer mr-2 text-[#C2C9D1]"
                                            onClick={() => handleViewDetails(event.id)}
                                        />
                                        <EditIcon className="cursor-pointer mr-2 text-[#C2C9D1]" onClick={handleCreateEvent}/>
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
                            className={`border px-3 py-1 font-semibold text-base min-w-[36px] rounded ${page === i + 1
                                ? "bg-white text-[#345794] border-[#345794]"
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
            )}
            
        </div>
    );
}
