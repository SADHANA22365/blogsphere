import { fetchPosts } from "../services/api";

const USERS_KEY = "users";
const BLOGS_KEY = "blogs";
const CURRENT_USER = "currentUser";

export const getUsers = () =>
  JSON.parse(localStorage.getItem(USERS_KEY)) || [];

export const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const addUser = (user) => {
  const users = getUsers();
  saveUsers([...users, user]);
};

export const updateUser = (updatedUser) => {
  const users = getUsers().map(u =>
    u.id === updatedUser.id ? updatedUser : u
  );
  saveUsers(users);
};

export const deleteUser = (id) => {
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);

  // remove blogs created by that user
  const blogs = getBlogs().filter(b => b.userId !== id);
  saveBlogs(blogs);
};

export const getBlogs = () =>
  JSON.parse(localStorage.getItem(BLOGS_KEY)) || [];

export const saveBlogs = (blogs) =>
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));

export const addBlog = (blog) => {
  const blogs = getBlogs();
  saveBlogs([...blogs, blog]);
};

export const updateBlog = (updatedBlog) => {
  const blogs = getBlogs();
  const exists = blogs.some(b => b.id === updatedBlog.id);

  const updated = exists
    ? blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
    : [...blogs, updatedBlog];

  saveBlogs(updated);
};

export const deleteBlog = (id) => {
  const blogs = getBlogs().filter(b => b.id !== id);
  saveBlogs(blogs);
};

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(CURRENT_USER));

export const setCurrentUser = (user) =>
  localStorage.setItem(CURRENT_USER, JSON.stringify(user));

export const logout = () =>
  localStorage.removeItem(CURRENT_USER);

// Fetch API blogs ONCE
export const seedBlogsFromAPI = async () => {
  if (localStorage.getItem(BLOGS_KEY)) return;

  const apiBlogs = await fetchPosts();
  localStorage.setItem(BLOGS_KEY, JSON.stringify(apiBlogs));
};

export const cleanupOrphanBlogs = () => {
  const users = getUsers();
  const blogs = getBlogs();

  const validUserIds = users.map(u => u.id);

  const cleanedBlogs = blogs.filter(b =>
    validUserIds.includes(b.userId)
  );

  saveBlogs(cleanedBlogs);
};

