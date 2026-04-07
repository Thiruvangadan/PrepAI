import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import SidebarLayout from "./layouts/SidebarLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <SidebarLayout>
          <Home />
        </SidebarLayout>
      </Protected>
    ),
  },
  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <SidebarLayout>
          <Interview />
        </SidebarLayout>
      </Protected>
    ),
  },
]);
