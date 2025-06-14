import { createElement } from "react";
import { RouteObject } from "react-router";
import { pathKeys } from "~shared/lib/react-router";
import {RatingPage} from './ranking-page.ui'

export const RankingPageRoute: RouteObject = {
  path: pathKeys.ranking(),
  element: createElement(RatingPage),
};
