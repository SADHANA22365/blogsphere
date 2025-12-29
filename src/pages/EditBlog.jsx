import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getBlogs, updateBlog } from "../utils/storage";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const blog = getBlogs().find(b => b.id === Number(id));

  // Safety check
  if (!blog) {
    return (
      <div className="text-red-600 font-semibold">
        Blog not found
      </div>
    );
  }

  // Authorization check
  if (user.role === "user" && blog.userId !== user.id) {
    return (
      <div className="text-red-600 font-semibold">
        You are not authorized to edit this blog
      </div>
    );
  }

  // ✅ Initialize state ONCE
  const [title, setTitle] = useState(blog.title);
  const [body, setBody] = useState(blog.body);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateBlog({
      ...blog,
      title,
      body,
    });

    queryClient.invalidateQueries(["blogs"]);

    navigate(
      user.role === "admin" ? "/admin/blogs" : "/user/my-blogs"
    );
  };

  return (
    <form
      className="bg-white p-6 shadow space-y-4 max-w-xl"
      onSubmit={handleUpdate}
    >
      <h2 className="text-xl font-bold">Edit Blog</h2>

      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 rounded w-full"
        rows="5"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />

      <Button type="submit">Update</Button>
    </form>
  );
}
