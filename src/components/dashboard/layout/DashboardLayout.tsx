"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MusicLibraryPage } from "@/components/dashboard/MusicLibrary/MusicLibraryPage";
import { UpcomingEventsPage } from "@/components/dashboard/UpcomingEvents/UpcomingEventsPage";
import { MediaGalleryPage } from "@/components/dashboard/Media/MediaGalleryPage";
import { CreateEventModal } from "@/components/forms/CreateEvent/CreateEventModal";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/store/slices/userRoleSlice";
import { FeedBackPage } from "../Feedback/FeedBackPage";
import { DashboardPage } from "../dashboard view/DashboardPage";
import { UserRequestsPage } from "../UserRequests/UserRequestsPage";

interface DashboardLayoutProps {
  role: "user" | "admin";
}

interface EventRequest {
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

export function DashboardLayout({ role }: Readonly<DashboardLayoutProps>) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState(() => {
    if (role === "admin") return "Dashboard";
    if (role === "user") return "Upcoming Events";
    return "Unknown Role";
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventRequest>();
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserRole(role));
  }, [dispatch, role]);
  
  const toggleSidebar = () => setIsMobileSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsMobileSidebarOpen(false);
  const handleSidebarNavigation = (view: string) => {
    setActiveView(view);
    closeSidebar();
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case "Upcoming Events":
        return (
          <UpcomingEventsPage
            setIsCreateModalOpen={setIsCreateModalOpen}
            setActiveView={setActiveView}
            setActiveSubItem={setActiveSubItem}
          />
        );
      case "Dashboard":
        return <DashboardPage/>;
      case "Music Library":
        return (
          <MusicLibraryPage
            setActiveView={setActiveView}
            setActiveSubItem={setActiveSubItem}
          />
        );
      case "Media":
        return (
          <MediaGalleryPage
            setActiveView={setActiveView}
            setActiveSubItem={setActiveSubItem}
          />
        );
      case "Feedback":
        return <FeedBackPage setActiveView={setActiveView} />;
      case "User Requests":
        return (
          <UserRequestsPage
            setActiveView={setActiveView}
            setIsCreateModalOpen={setIsEditModalOpen}
            setEditingEvent={setEditingEvent}
          />
        );
      default:
        return <div className="p-4">Select a view</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header
        title="Welcome Back"
        userName="John Doe"
        userAvatar="/images/avatar.png"
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex">
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onClose={closeSidebar}
          onNavigate={handleSidebarNavigation}
          role={role}
          setActiveSubItem={setActiveSubItem}
          activeSubItem={activeSubItem}
        />

        <div className="flex-1 w-full px-5 pt-8 pb-4">{renderView()}</div>
      </div>

      <CreateEventModal
        open={isCreateModalOpen}
        onClose={handleCloseModal}
        isEditMode={false}
        setActiveView={setActiveView}
      />

      {/* Edit Event Modal */}
      <CreateEventModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        isEditMode={true}
        initialData={editingEvent}
        eventId={editingEvent?.slug}
        isUserRequestPage={true}
        setActiveView={setActiveView}
      />
    </div>
  );
}
