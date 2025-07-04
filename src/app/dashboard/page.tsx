"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { CreateEventModal } from "@/components/dashboard/Upcoming-Events/Create-Event-Modal";
import { MusicLibraryPage } from "@/components/dashboard/Music-Library/Music-Library-Page";
import { UpcomingEventsPage } from "@/components/dashboard/Upcoming-Events/Upcoming-Events-Page";


const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("Upcoming Events"); // 👈 default view

 
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
          {activeView === "Upcoming Events" && <UpcomingEventsPage setIsCreateModalOpen={setIsCreateModalOpen}/>}

          {activeView === "Music Library" && <MusicLibraryPage />}
          
          {/* Future: You can add more views here */}
          {activeView !== "Upcoming Events" && activeView !== "Music Library" &&(
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
