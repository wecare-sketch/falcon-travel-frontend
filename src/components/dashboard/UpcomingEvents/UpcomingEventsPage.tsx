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
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileEventListItem } from "../MobileListItem";
import { useAdminEvents } from "@/hooks/events/useAdminEvents";
import { useEditEvent } from "@/hooks/events/useEditEvent";
import { useQueryClient } from "@tanstack/react-query";


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

const PAGE_SIZE = 4;

interface UpcomingEventsPageProps {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

export function UpcomingEventsPage({
  setIsCreateModalOpen,
}: Readonly<UpcomingEventsPageProps>) {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<null | {
    id: number;
    slug: string;
    eventType: string;
    clientName: string;
    phoneNumber: string;
    pickupDate: string;
    location: string;
    passengerCount: number;
    hoursReserved: number;
    equityDivision: number;
    status: string;
    totalAmount: number;
    pendingAmount: number;
    depositAmount: number;
    vehicle: string;
  }>(null);

  const role = useSelector((state: RootState) => state.userRole.role);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const { data: adminEventsData, isLoading, isError } = useAdminEvents();
  const editMutation = useEditEvent();
  const queryClient = useQueryClient();

  const handleViewDetails = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (eventId: number) => {
    const originalEvent = adminEventsData?.events.find(e => e.id === eventId);
    if (originalEvent) {
      setEditingEvent({
        id: originalEvent.id,
        slug: originalEvent.slug,
        eventType: originalEvent.eventType,
        clientName: originalEvent.clientName,
        phoneNumber: originalEvent.phoneNumber,
        pickupDate: originalEvent.pickupDate,
        location: originalEvent.location,
        passengerCount: originalEvent.passengerCount,
        hoursReserved: originalEvent.hoursReserved,
        equityDivision: originalEvent.equityDivision,
        status: originalEvent.status,
        totalAmount: originalEvent.totalAmount,
        pendingAmount: originalEvent.pendingAmount,
        depositAmount: originalEvent.depositAmount,
        vehicle: originalEvent.vehicle,
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingEvent) return;

    try {
      await editMutation.mutateAsync({
        eventId: editingEvent.slug,
        data: {
          eventDetails: {
            eventType: editingEvent.eventType,
            clientName: editingEvent.clientName,
            phoneNumber: editingEvent.phoneNumber,
            pickupDate: editingEvent.pickupDate,
            location: editingEvent.location,
            passengerCount: editingEvent.passengerCount,
            hoursReserved: editingEvent.hoursReserved,
            equityDivision: editingEvent.equityDivision,
            status: editingEvent.status,
          },
          vehicleInfo: {
            vehicle: editingEvent.vehicle,
          },
          paymentDetails: {
            totalAmount: editingEvent.totalAmount,
            depositAmount: editingEvent.depositAmount,
            pendingAmount: editingEvent.pendingAmount,
          },
        },
      });
      setEditingEvent(null);
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const mappedAdminEvents = adminEventsData?.events.map(event => ({
    id: event.id,
    title: event.eventType,
    date: new Date(event.pickupDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }),
    passenger: event.passengerCount.toString(),
    remainingAmount: `${event.pendingAmount}$`,
    paymentStatus: event.status === 'pending' ? 'Pending' : 'Paid',
    clientName: event.clientName
  })) || [];

  const paginatedEvents = mappedAdminEvents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(mappedAdminEvents.length / PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error loading events. Please try again later.
      </div>
    );
  }

  if (selectedEventId !== null) {
    return <EventDetailsPage eventId={selectedEventId} />;
  }

  return (
    <div>
      <PageHeader title="List of Events" />
      <SearchFilters />
      {role === "admin" ? (
        isMobile ? (
          <div>
            {paginatedEvents.map((event) => (
              <MobileEventListItem
                key={event.id}
                eventName={event.title}
                clientName={event.clientName}
                passenger={parseInt(event.passenger, 10) || 0}
                date={event.date}
                remainingAmount={parseInt(event.remainingAmount.replace(/\$/g, ""), 10) || 0}
                paymentStatus={event.paymentStatus as "Paid" | "Pending" | "Overdue"}
                onEdit={() => handleEditClick(event.id)}
                onDelete={() => {}}
              />
            ))}
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
          </div>
        ) : (
          <div className="p-4">
            <div className="flex justify-end mb-3">
              <button
                className="bg-[#345794] text-white rounded px-6 py-2 font-semibold text-base cursor-pointer"
                onClick={handleCreateEvent}
              >
                + Create Event
              </button>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="w-full border border-gray-300 border-t-0 border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F8F9FB] text-[#00000080]">
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      <input type="checkbox" />
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">No.</th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">Event Name</th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">Date</th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">Passenger</th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">Remaining Amount</th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">Payment Status</th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">Client Name</th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEvents.map((event, idx) => (
                    <tr
                      key={event.id}
                      className={
                        idx % 2 === 1
                          ? "bg-[#F3F6F9] text-center text-black"
                          : "bg-white text-center text-black"
                      }
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
                      <td className="py-2 px-2 border border-gray-300">{event.remainingAmount}</td>
                      <td className="py-2 px-2 border border-gray-300">
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
                      <td className="py-2 px-2 border border-gray-300">{event.clientName}</td>
                      <td className="py-2 px-2 border border-gray-300">
                        <DescriptionIcon
                          className="cursor-pointer mr-2 text-[#C2C9D1]"
                          onClick={() => handleViewDetails(event.id)}
                        />
                        <EditIcon 
                          className="cursor-pointer mr-2 text-[#C2C9D1]" 
                          onClick={() => handleEditClick(event.id)} 
                        />
                        <DeleteIcon className="cursor-pointer text-[#C2C9D1]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          </div>
        )
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

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Event</h2>
                <button 
                  onClick={() => setEditingEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <input
                      type="text"
                      value={editingEvent.eventType}
                      onChange={(e) => setEditingEvent({...editingEvent, eventType: e.target.value})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={editingEvent.clientName}
                      onChange={(e) => setEditingEvent({...editingEvent, clientName: e.target.value})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={editingEvent.phoneNumber}
                      onChange={(e) => setEditingEvent({...editingEvent, phoneNumber: e.target.value})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                    <input
                      type="datetime-local"
                      value={editingEvent.pickupDate.slice(0, 16)}
                      onChange={(e) => setEditingEvent({...editingEvent, pickupDate: e.target.value})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingEvent.location}
                      onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Count</label>
                    <input
                      type="number"
                      value={editingEvent.passengerCount}
                      onChange={(e) => setEditingEvent({...editingEvent, passengerCount: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                    <input
                      type="text"
                      value={editingEvent.vehicle}
                      onChange={(e) => setEditingEvent({...editingEvent, vehicle: e.target.value})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editingEvent.status}
                      onChange={(e) => setEditingEvent({...editingEvent, status: e.target.value})}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                <button
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={editMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {editMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}