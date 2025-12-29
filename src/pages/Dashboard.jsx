import { useQuery } from "@tanstack/react-query";
import { getUsers, getBlogs } from "../utils/storage";
import StatCard from "../components/StatCard";
import UserTable from "../components/UserTable";

export default function Dashboard() {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      
      {/* Page Header */}
      <div className="w-full min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-700 mt-1">
          Overview of users and blog activity
        </p>
      </div>

      {/* Stats Section */}
      <div className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={users.length} />
        <StatCard title="Total Blogs" value={blogs.length} />
        <StatCard
          title="Active Users"
          value={activeUser ? 1 : 0}
        />
      </div>

      {/* Users Table Section */}
      <div className="w-full min-w-0 bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          User Overview
        </h2>

        {/* Table wrapper – CRITICAL */}
        <div className="w-full min-w-0 overflow-x-auto">
          <UserTable />
        </div>
      </div>

    </div>
  );
}
