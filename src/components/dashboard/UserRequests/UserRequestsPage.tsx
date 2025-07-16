
import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { SearchFilters } from "../SearchFilter";
import { EventDetailsPage } from "../EventDetails/EventDetailPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";


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

export function UserRequestsPage({
    setIsCreateModalOpen,
}: Readonly<UserRequestsPage>) {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
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
        </div>
    );
}
