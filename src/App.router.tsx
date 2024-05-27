import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import { CreateUserPage, UpdateUserPage } from "./pages/";
import { DashboardPage } from "./pages";
import AppLayout from "./App.layout";

const RouterBuilder = () => {
  const generalRoutes: RouteObject[] = [
    {
      path: "/",
      element: <DashboardPage />,
    },
    {
      path: "/users/create",
      element: <CreateUserPage />,
    },
    {
      path: "/users/:id",
      element: <UpdateUserPage />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];

  const routes: RouteObject[] = [
    {
      element: <AppLayout />,
      children: generalRoutes,
    },
  ];

  return routes;
};

export default RouterBuilder;
