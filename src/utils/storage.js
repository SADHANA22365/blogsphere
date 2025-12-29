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

  // remove blogs created by this user
  const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY)) || [];
  const filteredBlogs = blogs.filter(b => b.userId !== id);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(filteredBlogs));
};

export const getBlogs = async () => {
  const storedBlogs = JSON.parse(localStorage.getItem(BLOGS_KEY));

  if (storedBlogs && storedBlogs.length > 0) {
    return storedBlogs;
  }

  // Fetch from API
  const apiBlogs = await fetchPosts();

  localStorage.setItem(BLOGS_KEY, JSON.stringify(apiBlogs));
  return apiBlogs;
};

export const saveBlogs = (blogs) =>
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));

export const addBlog = (blog) => {
  const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY)) || [];
  saveBlogs([...blogs, blog]);
};

export const updateBlog = (updatedBlog) => {
  const blogs = (JSON.parse(localStorage.getItem(BLOGS_KEY)) || []).map(b =>
    b.id === updatedBlog.id ? updatedBlog : b
  );
  saveBlogs(blogs);
};

export const deleteBlog = (id) => {
  const blogs = (JSON.parse(localStorage.getItem(BLOGS_KEY)) || []).filter(
    b => b.id !== id
  );
  saveBlogs(blogs);
};

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(CURRENT_USER));

export const setCurrentUser = (user) =>
  localStorage.setItem(CURRENT_USER, JSON.stringify(user));

export const logout = () =>
  localStorage.removeItem(CURRENT_USER);

export const cleanupOrphanBlogs = () => {
  const users = getUsers();
  const blogs = JSON.parse(localStorage.getItem(BLOGS_KEY)) || [];

  const validUserIds = users.map(u => u.id);

  const cleanedBlogs = blogs.filter(b =>
    validUserIds.includes(b.userId)
  );

  localStorage.setItem(BLOGS_KEY, JSON.stringify(cleanedBlogs));
};
