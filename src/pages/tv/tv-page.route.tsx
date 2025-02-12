import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { TvPage } from './tv-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const tvPageRoute: RouteObject = {
  path: pathKeys.tv(), 
  element: createElement(TvPage),
};
