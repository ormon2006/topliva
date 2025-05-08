import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { DashboardPage} from './about-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const DashboardPageRoute: RouteObject = {
  path: pathKeys.about(),
  element: createElement(DashboardPage),
};
