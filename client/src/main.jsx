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
import Error from "./routes/Error.jsx"; // ⬅️ import the error component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IKContext } from "imagekitio-react";
import "prismjs/themes/prism-tomorrow.css";

//create queryClinet object
const queryClient = new QueryClient();
// Import your Publishable Key for clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;
const IK_PUBLIC_KEY = import.meta.env.VITE_IK_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />, // ⬅️ top-level layout error handler
    children: [
      {
        path: "/",
        element: <Homepage />,
        errorElement: <Error />, // ⬅️ individual route fallback (optional)
      },
      {
        path: "/write",
        element: <Write />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <Error />,
      },
      {
        path: "/posts",
        element: <PostsList />,
        errorElement: <Error />,
      },
      {
        path: "/:slug",
        element: <SinglePost />,
        errorElement: <Error />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <IKContext
          urlEndpoint={urlEndpoint}
          publicKey={IK_PUBLIC_KEY}
          authenticator={authenticator}
        >
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" />
        </IKContext>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
