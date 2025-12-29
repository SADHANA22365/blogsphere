import { useQuery } from "@tanstack/react-query";
import { getUsers, getBlogs } from "../utils/storage";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function UserTable() {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return (
    /* OUTER WRAPPER — prevents overflow */
    <div className="w-full min-w-0 overflow-hidden">
      
      {/* Table container */}
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-900 text-sm">
              <th className="px-4 py-3 text-left font-semibold">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Email
              </th>
              <th className="px-4 py-3 text-center font-semibold">
                Blogs
              </th>
              <th className="px-4 py-3 text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => {
              const count = blogs.filter(
                b => b.userId === user.id
              ).length;

              return (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3 text-gray-800 truncate max-w-[180px]">
                    {user.name}
                  </td>

                  <td className="px-4 py-3 text-gray-700 truncate max-w-[240px]">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 text-center text-gray-800 font-medium">
                    {count}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <Link to="/admin/blogs">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
