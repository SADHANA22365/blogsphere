import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../utils/storage";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Latest Blogs
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Read thoughts shared by the BlogSphere community
        </p>
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <p className="text-gray-500 text-center">
          No blogs available yet.
        </p>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
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
            </div>

            {/* Read More */}
            <div className="mt-5">
              <Link
                to={`/blogs/${blog.id}`}
                className="text-indigo-600 font-medium text-sm hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
