import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { TandaPage } from './tanda.route';

export const tandaPageRoute: RouteObject = {
  path: '/tanda/',
  element: createElement(TandaPage),
};
