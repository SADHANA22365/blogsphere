import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogs, getUsers } from "../utils/storage";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blog } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => {
      const blogs = getBlogs();
      return blogs.find(b => String(b.id) === String(id));
    },
  });

  if (!blog) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Blog not found
      </div>
    );
  }

  const author = getUsers().find(u => u.id === blog.userId);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-medium mb-4 hover:underline"
        >
          ← Back to Blogs
        </button>

        {/* Branding */}
        <p className="text-sm font-semibold text-indigo-600 mb-2">
          BlogSphere
        </p>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {blog.title}
        </h1>

        {/* Author */}
        <p className="text-sm text-gray-500 mb-6">
          By {author?.name || "Unknown Author"}
        </p>

        <div className="h-px bg-gray-200 mb-6"></div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
          {blog.body}
        </p>
      </div>
    </div>
  );
}
