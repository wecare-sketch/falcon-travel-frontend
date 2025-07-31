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
import { CreateEventFormData } from "@/types/form";
import { FeedBackPage } from "../Feedback/FeedBackPage";
import { DashboardPage } from "../dashboard view/DashboardPage";
import { UserRequestsPage } from "../UserRequests/UserRequestsPage";

interface DashboardLayoutProps {
  role: "user" | "admin";
}

export function DashboardLayout({ role }: Readonly<DashboardLayoutProps>) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState(() => {
    if (role === "admin") return "Dashboard";
    if (role === "user") return "Upcoming Events";
    return "Unknown Role";
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  const handleSubmitEvent = (eventData: CreateEventFormData) => {
    console.log("Creating new event:", eventData);
  };
  const renderView = () => {
    switch (activeView) {
      case "Upcoming Events":
        return (
          <UpcomingEventsPage setIsCreateModalOpen={setIsCreateModalOpen} />
        );
      case "Dashboard":
        return <DashboardPage/>
      case "Music Library":
        return <MusicLibraryPage />;
      case "Media":
        return <MediaGalleryPage />;
      case "Feedback":
        return <FeedBackPage/>
      case "User Requests":
          return <UserRequestsPage setIsCreateModalOpen={setIsCreateModalOpen}/>
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
        />

        <div className="flex-1 w-full px-5 pt-8 pb-4">{renderView()}</div>
      </div>

      <CreateEventModal
        open={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreateEvent={handleSubmitEvent}
      />
    </div>
  );
}
