import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { pathKeys } from '../../shared/lib/react-router';
import { CoursePage } from './course-page.ui';

export const coursePageRoute: RouteObject = {
  path: "courses/:id",
  element: createElement(CoursePage),
};
