import { Core } from "@koppajs/koppajs-core";

import HomePage from "./home-page.kpa";
import LearnPage from "./learn-page.kpa";
import NotFoundPage from "./not-found-page.kpa";
import SiteContentPage from "./site-content-page.kpa";

export const registerPages = (): void => {
  Core.take(HomePage, "home-page");
  Core.take(LearnPage, "learn-page");
  Core.take(SiteContentPage, "site-content-page");
  Core.take(NotFoundPage, "not-found-page");
};
