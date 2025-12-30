import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { seedBlogsFromAPI } from "./utils/storage";
import { seedData } from "./utils/seedData";
import { AuthProvider } from "./context/AuthContext";

seedData();           // users
seedBlogsFromAPI();   // blogs from API

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthProvider>
  </QueryClientProvider>
);
