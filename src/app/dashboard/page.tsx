"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { PageHeader } from "@/components/dashboard/Page-Header";
import { SearchFilters } from "@/components/dashboard/Search-Filter";
import { EventCard } from "@/components/dashboard/Event-Card";
import { CreateEventCard } from "@/components/dashboard/Create-Event-Card";
import { CreateEventModal } from "@/components/dashboard/Create-Event-Modal";

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

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("Upcoming Events"); // 👈 default view

  const handleViewDetails = (eventId: number) => {
    console.log("View details for event:", eventId);
  };

  const handleCreateEvent = () => {
    console.log("Create new event");
    setIsCreateModalOpen(true);
  };

  const toggleSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSubmitEvent = (eventData: any) => {
    console.log("Creating new event:", eventData);
  };

  const handleSidebarNavigation = (view: string) => {
    setActiveView(view); // 👈 update view
    closeSidebar(); // 👈 optional: close sidebar after selection
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
          onNavigate={handleSidebarNavigation} // 👈 pass handler
        />

        <main className="flex-1 p-4 md:p-8 lg:p-12 w-full">
          {/* Conditionally Render Based on Active View */}
          {activeView === "Upcoming Events" && (
            <>
              <PageHeader />
              <SearchFilters />
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    imageUrl={event.imageUrl}
                    onViewDetails={() => handleViewDetails(event.id)}
                  />
                ))}
                <CreateEventCard onCreateEvent={handleCreateEvent} />
              </div>
            </>
          )}

          {/* Future: You can add more views here */}
          {activeView !== "Upcoming Events" && (
            <div className="text-center text-gray-500 mt-20">
              <p>No view selected or under construction.</p>
            </div>
          )}
        </main>
      </div>

      <CreateEventModal
        open={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreateEvent={handleSubmitEvent}
      />
    </div>
  );
};

export default Dashboard;
