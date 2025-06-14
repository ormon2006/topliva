import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";

import { GenericLayout, IntroLayout } from "../../pages/layout";
import { ProtectedRoute } from "~pages/layout/layout.ui";
import { DashboardPageRoute } from "~pages/about";
import { AuthPageRoute } from "~pages/auth-page";
import { RankingPageRoute } from "~pages/ranking";

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
            children: [DashboardPageRoute, RankingPageRoute],
          },
          { element: <IntroLayout />, children: [AuthPageRoute] },
        ],
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
