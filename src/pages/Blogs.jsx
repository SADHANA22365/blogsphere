import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlogs, deleteBlog } from "../utils/storage";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function Blogs() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showMine, setShowMine] = useState(false);

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const visibleBlogs = showMine
    ? blogs.filter(b => b.userId === user.id)
    : blogs;

  const handleDelete = (id) => {
    deleteBlog(id);
    queryClient.invalidateQueries(["blogs"]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Blogs
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Explore blogs created by users
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Button
          onClick={() => setShowMine(false)}
          className={!showMine ? "bg-indigo-600 text-white" : "bg-gray-200"}
        >
          All Blogs
        </Button>

        <Button
          onClick={() => setShowMine(true)}
          className={showMine ? "bg-indigo-600 text-white" : "bg-gray-200"}
        >
          My Blogs
        </Button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleBlogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
          >
            {/* CLICKABLE BLOG */}
            <Link
              to={`/blogs/${blog.id}`}
              className="block mb-4"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:underline">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-700 line-clamp-3">
                {blog.body}
             </p>

             <Link
               to={`/admin/blogs/${blog.id}`}
               className="text-indigo-600 text-sm font-medium mt-3 inline-block hover:underline"
              >
               Read more →
             </Link>

            </Link>

            {(blog.userId === user.id || user.role === "admin") && (
              <div className="flex gap-3 mt-3">
                <Link to={`/admin/blogs/edit/${blog.id}`} className="flex-1">
                  <Button className="w-full bg-indigo-600 text-white">
                    Edit
                  </Button>
                </Link>

                <Button
                  className="flex-1 bg-red-600 text-white"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
