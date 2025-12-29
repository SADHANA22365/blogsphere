import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, addUser, deleteUser } from "../utils/storage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function ManageUsers() {
  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = () => {
    if (!name || !email) return;

    addUser({
      id: Date.now(),
      name,
      email,
      password: "123456",
      role: "user",
    });

    setName("");
    setEmail("");
    queryClient.invalidateQueries(["users"]);
  };

  const handleDelete = (id) => {
    deleteUser(id);
    queryClient.invalidateQueries(["users"]);
    queryClient.invalidateQueries(["blogs"]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Users
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Add, view, and remove users from the platform
        </p>
      </div>

      {/* Add User Section */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add New User
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleAddUser}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Add User
          </Button>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl shadow-md divide-y">
        {users.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No users found
          </p>
        ) : (
          users.map(user => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600">
                  {user.email}
                </p>
              </div>

              <Button
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
