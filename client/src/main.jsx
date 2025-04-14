import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-quill-new/dist/quill.snow.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/Homepage.jsx";
import Write from "./routes/Write.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import PostsList from "./routes/PostsList.jsx";
import SinglePost from "./routes/SinglePost.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import{ ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/posts",
        element: <PostsList />,
      },
      {
        path: "/:slug",
        element: <SinglePost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ToastContainer position='bottom-right' />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
