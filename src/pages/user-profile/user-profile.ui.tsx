import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { UserProfilePage } from './user-profile.route';

export const userProfilePageRoute: RouteObject = {
  path: '/:username/',
  element: createElement(UserProfilePage),
};
