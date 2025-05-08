import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";

import { GenericLayout, IntroLayout } from "../../pages/layout";
import { ProtectedRoute } from "~pages/layout/layout.ui";
import { DashboardPageRoute } from "~pages/about";

function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <ProtectedRoute isAuthenticated={true} />,
        children: [
          {
            element: <GenericLayout />,
            children: [DashboardPageRoute],
          },
        ],
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
