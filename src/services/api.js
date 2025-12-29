const BASE = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async () =>
  fetch(`${BASE}/users`).then(res => res.json());

export const fetchPosts = async () =>
  fetch(`${BASE}/posts`).then(res => res.json());

export const fetchPostById = async (id) =>
  fetch(`${BASE}/posts/${id}`).then(res => res.json());

export const createPost = async (post) =>
  fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  }).then(res => res.json());
