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
import { useEventsByRole } from "@/hooks/events/useEventsByRole";
import { CreateEventModal } from "@/components/forms/CreateEvent/CreateEventModal";
import { useDeleteEvent } from "@/hooks/events/useDeleteEvent";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const PAGE_SIZE = 4;

interface UpcomingEventsPageProps {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

interface EventFormData {
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  location: string;
  addStops: string;
  hoursReserved: number;
  totalAmount: number;
  pendingAmount: number;
  equityDivision: number;
  imageUrl: string;
  name: string;
  slug: string;
  id: string;
  passengerCount: number;
  paymentStatus: string;
  depositAmount: number;
  vehicle: string;
}

export function UpcomingEventsPage({
  setIsCreateModalOpen,
}: Readonly<UpcomingEventsPageProps>) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormData>();

  const role = useSelector((state: RootState) => state.userRole.role);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const { data: eventsData, isLoading, isError } = useEventsByRole();
  const { mutate: deleteEvent } = useDeleteEvent();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleViewDetails = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  const handleClose = () => {
    setOpenEditModal(false);
  };
  const handleEditClick = (eventId: string) => {
    const originalEvent = eventsData?.events.find((e) => e.id === eventId);
    if (originalEvent) {
      setEditingEvent(originalEvent);
    }
    setOpenEditModal(true);
  };

  const handleDeleteClick = (slug: string) => {
    setEventToDelete(slug);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete, {
        onSuccess: () => {
          toast.success("Event deleted!");
          setDeleteDialogOpen(false);
          setEventToDelete(null);
        },
        onError: () => {
          toast.error("Failed to delete event.");
        },
      });
    }
  };

  const mappedAdminEvents =
    eventsData?.events.map((event) => ({
      id: event.id,
      title: event.eventType,
      date: new Date(event.pickupDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      passenger: event.passengerCount.toString(),
      paymentStatus: event.paymentStatus,
      remainingAmount: `${event.pendingAmount}$`,
      clientName: event.clientName,
      slug: event.slug,
    })) || [];

  const paginatedEvents = mappedAdminEvents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
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
                remainingAmount={
                  parseInt(event.remainingAmount.replace(/\$/g, ""), 10) || 0
                }
                paymentStatus={
                  event.paymentStatus as "Paid" | "Pending" | "Overdue"
                }
                onEdit={() => handleEditClick(event.id)}
                onDelete={() => handleDeleteClick(event.slug)}
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
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      No.
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      Event Name
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      Date
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      Passenger
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      Remaining Amount
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      Payment Status
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      Client Name
                    </th>
                    <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                      Action
                    </th>
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
                      <td className="py-2 px-2 border border-gray-300">
                        {event.title}
                      </td>
                      <td className="py-2 px-2 border border-gray-300">
                        {event.date}
                      </td>
                      <td className="py-2 px-2 border border-gray-300">
                        {event.passenger}
                      </td>
                      <td className="py-2 px-2 border border-gray-300">
                        {event.remainingAmount}
                      </td>
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
                      <td className="py-2 px-2 border border-gray-300">
                        {event.clientName}
                      </td>
                      <td className="py-2 px-2 border border-gray-300">
                        <DescriptionIcon
                          className="cursor-pointer mr-2 text-[#C2C9D1]"
                          onClick={() => handleViewDetails(event.id)}
                        />
                        <EditIcon
                          className="cursor-pointer mr-2 text-[#C2C9D1]"
                          onClick={() => handleEditClick(event.id)}
                        />
                        <DeleteIcon
                          className="cursor-pointer text-[#C2C9D1]"
                          onClick={() => handleDeleteClick(event.slug)}
                        />
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
          {eventsData?.events.map((event) => (
            <EventCard
              key={event.id}
              title={event.name}
              date={event.pickupDate}
              imageUrl={event.imageUrl}
              Label="View Details"
              onViewDetails={() => handleViewDetails(event.id)}
            />
          ))}
          <CreateEventCard onCreateEvent={handleCreateEvent} />
        </div>
      )}

      {/* Edit Event Modal */}
      <CreateEventModal
        open={openEditModal}
        onClose={handleClose}
        isEditMode={true}
        initialData={editingEvent}
        eventId={editingEvent?.slug}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
