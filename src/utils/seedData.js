import { saveUsers, saveBlogs } from "./storage";

export const seedData = async () => {
  // Seed users
  if (!localStorage.getItem("users")) {
    const users = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then(res => res.json());

    saveUsers(
      users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: "user",
        password: "123456",
      }))
    );
  }

  // Seed blogs
  if (!localStorage.getItem("blogs")) {
    const blogs = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then(res => res.json());

    saveBlogs(
      blogs.map(b => ({
        ...b,
        source: "api", // 🔥 THIS IS THE FIX
      }))
    );
  }
};
