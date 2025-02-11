import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import { authPageRoute } from "../../pages/auth";
import { dashboardPageRoute } from "../../pages/dashboard";
import { coursesPageRoute } from "../../pages/courses";
import { profilePageRoute } from "../../pages/profile";
import { rankingPageRoute } from "../../pages/ranking/ranking-page.route";
import { GenericLayout, IntroLayout } from "../../pages/layout";
import { TandaLayout } from "~pages/tandalayout";
import { coursePageRoute } from "~pages/course";
import { badgesPageRoute } from "~pages/badges";
import { aboutPageRoute } from "~pages/about";
import { ProtectedRoute } from "~pages/layout/layout.ui";
import { getCookie } from "typescript-cookie";
import { userProfilePageRoute } from "~pages/user-profile/user-profile.ui";
import { gradePageRoute } from "~pages/grades";
import { tandaPageRoute } from "~pages/tanda";
import { TestPageRoute } from "~pages/tandaTestPage";
import { LoginPageRoute } from "~pages/tandaLoginPage/tandaLogin.route";
import { ResultPageRoute } from "~pages/tandaResultPage";
function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const isAuth = !!getCookie("access");

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <ProtectedRoute isAuthenticated={true} />,
        children: [
          {
            element: <GenericLayout />,
            children: [
              dashboardPageRoute,
              coursesPageRoute,
              profilePageRoute,
              rankingPageRoute,
              coursePageRoute,
              badgesPageRoute,
              gradePageRoute,
            ],
          },
        ],
      },
      {
        element: <IntroLayout />,
        children: [authPageRoute, aboutPageRoute, userProfilePageRoute],
      },
      {
        element: <TandaLayout />,
        children: [
          tandaPageRoute,
          TestPageRoute,
          LoginPageRoute,
          ResultPageRoute,
        ],
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
