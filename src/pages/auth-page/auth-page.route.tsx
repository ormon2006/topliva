import { createElement } from "react";
import { RouteObject } from "react-router";
import { pathKeys } from "~shared/lib/react-router";
import { AuthPage } from "./auth-page.ui";

export const AuthPageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(AuthPage),
};
