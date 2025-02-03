import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { GradePage } from './grades-page.ui';

export const gradePageRoute: RouteObject = {
  path: '/course/:courseId/group/:groupId/',
  element: createElement(GradePage),
};
