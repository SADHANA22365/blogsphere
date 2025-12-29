import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addBlog } from "../utils/storage";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    const newBlog = {
      id: Date.now(),
      title,
      body,          // ✅ FULL CONTENT STORED
      userId: user.id,
    };

    addBlog(newBlog);
    queryClient.invalidateQueries(["blogs"]);

    navigate(user.role === "admin" ? "/admin/blogs" : "/user/my-blogs");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Create New Blog
        </h2>

        <Input
          placeholder="Blog Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="border rounded-lg w-full p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="10"   // 🔥 BIGGER AREA = LONGER CONTENT
          placeholder={`Write your blog here…

You can write multiple paragraphs.
Example:

Paragraph 1...

Paragraph 2...

Paragraph 3...`}
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Publish Blog
        </Button>
      </form>
    </div>
  );
}
