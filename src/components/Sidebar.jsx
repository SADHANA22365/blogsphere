import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();

  const handleNavClick = () => {
    setSidebarOpen(false); // auto close on mobile
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          w-64 min-h-screen
          bg-indigo-800
          text-white
          p-5
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* App Name */}
        <h1 className="text-2xl font-bold mb-8 tracking-wide">
          BlogSphere
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-sm">
          {[
            { to: "/admin", label: "Dashboard" },
            { to: "/admin/blogs", label: "Blogs" },
            { to: "/admin/create", label: "Create Blog" },
            { to: "/admin/users", label: "Manage Users" },
          ].map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `p-2 rounded font-medium transition
                 ${isActive
                   ? "bg-indigo-600"
                   : "hover:bg-indigo-700"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-auto pt-6 border-t border-indigo-500">
          <p className="text-xs text-indigo-200 mb-1">Logged in as</p>
          <p className="font-semibold mb-3">{user?.name}</p>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-1 rounded text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
