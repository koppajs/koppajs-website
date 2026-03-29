import { Core } from "@koppajs/koppajs-core";

import AboutPage from "./about-page.kpa";
import BlogPage from "./blog-page.kpa";
import EcosystemPage from "./ecosystem-page.kpa";
import HomePage from "./home-page.kpa";
import ImprintPage from "./imprint-page.kpa";
import NotFoundPage from "./not-found-page.kpa";
import PhilosophyPage from "./philosophy-page.kpa";
import PrivacyPage from "./privacy-page.kpa";
import SupportPage from "./support-page.kpa";

export const registerPages = (): void => {
  Core.take(HomePage, "home-page");
  Core.take(PhilosophyPage, "philosophy-page");
  Core.take(AboutPage, "about-page");
  Core.take(EcosystemPage, "ecosystem-page");
  Core.take(BlogPage, "blog-page");
  Core.take(SupportPage, "support-page");
  Core.take(PrivacyPage, "privacy-page");
  Core.take(ImprintPage, "imprint-page");
  Core.take(NotFoundPage, "not-found-page");
};
