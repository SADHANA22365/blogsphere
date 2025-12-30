import { useParams, useNavigate } from "react-router-dom";
import { getBlogs, getUsers } from "../utils/storage";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = getBlogs().find(
    b => String(b.id) === String(id)
  );

  if (!blog) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Blog not found
      </div>
    );
  }

  const author = getUsers().find(u => u.id === blog.userId);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">

        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-medium mb-4 hover:underline"
        >
          ← Back to Blogs
        </button>

        <p className="text-sm font-semibold text-indigo-600 mb-2">
          BlogSphere
        </p>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {blog.title}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          By {author?.name || "Unknown Author"}
        </p>

        <div className="h-px bg-gray-200 mb-6"></div>

        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {blog.body}
        </p>
      </div>
    </div>
  );
}
