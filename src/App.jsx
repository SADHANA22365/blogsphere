import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import EditBlog from "./pages/EditBlog";
import CreateBlog from "./pages/CreateBlog";
import ManageUsers from "./pages/ManageUsers";

// User Pages
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";

// Blog Details (PUBLIC)
import BlogDetails from "./pages/BlogDetails";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PUBLIC BLOG DETAILS */}
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* Redirect after login */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/user/home" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        {/* USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="my-blogs" element={<MyBlogs />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </div>
  );
}
