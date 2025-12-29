import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-indigo-700 text-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-3xl font-bold text-white"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold">BlogSphere</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full min-w-0 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
