import { useAuth } from "../context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlogs, deleteBlog } from "../utils/storage";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function MyBlogs() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const myBlogs = blogs.filter(b => b.userId === user.id);

  const handleDelete = (id) => {
    deleteBlog(id);
    queryClient.invalidateQueries(["blogs"]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Blogs
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Blogs you have created on BlogSphere
        </p>
      </div>

      {/* Empty */}
      {myBlogs.length === 0 && (
        <p className="text-gray-500 text-center">
          You haven’t created any blogs yet.
        </p>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
          >
            {/* Content */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-700 line-clamp-4">
                {blog.body}
              </p>

              {/* Read More */}
              <Link
                to={`/user/blogs/${blog.id}`}
                className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <Link
                to={`/user/blogs/edit/${blog.id}`}
                className="flex-1"
              >
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Edit
                </Button>
              </Link>

              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
