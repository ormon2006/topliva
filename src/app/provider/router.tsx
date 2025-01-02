import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import { authPageRoute } from '../../pages/auth';
import { dashboardPageRoute } from '../../pages/dashboard';
import { coursesPageRoute } from '../../pages/courses';
import { profilePageRoute } from '../../pages/profile';
import { rankingPageRoute } from '../../pages/ranking/ranking-page.route';
import { GenericLayout, IntroLayout } from '../../pages/layout';
import { coursePageRoute } from '~pages/course';
import { badgesPageRoute } from '~pages/badges';
import { aboutPageRoute } from '~pages/about';

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
        element: <GenericLayout />,
        children: [
          dashboardPageRoute,
          coursesPageRoute,
          profilePageRoute,
          rankingPageRoute,
          coursePageRoute,
          badgesPageRoute,
          aboutPageRoute,
        ],
      },
      {
        element: <IntroLayout />,
        children: [
          authPageRoute, 
        ],
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
