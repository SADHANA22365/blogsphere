import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Brand + Links */}
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-indigo-600">
              BlogSphere
            </h1>

            <div className="hidden sm:flex gap-6 text-sm font-medium text-gray-700">
              <Link
                to="/user/home"
                className="hover:text-indigo-600 transition"
              >
                Home
              </Link>
              <Link
                to="/user/my-blogs"
                className="hover:text-indigo-600 transition"
              >
                My Blogs
              </Link>
              <Link
                to="/user/create"
                className="hover:text-indigo-600 transition"
              >
                Create Blog
              </Link>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              Hi, <span className="font-medium">{user?.name}</span>
            </span>

            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="sm:hidden px-4 pb-4 flex gap-4 text-sm font-medium text-gray-700">
          <Link to="/user/home" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/user/my-blogs" className="hover:text-indigo-600">
            My Blogs
          </Link>
          <Link to="/user/create" className="hover:text-indigo-600">
            Create
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
