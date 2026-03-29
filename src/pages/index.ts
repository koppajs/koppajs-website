import { Core } from "@koppajs/koppajs-core";

import EcosystemPage from "./ecosystem-page.kpa";
import HomePage from "./home-page.kpa";
import NotFoundPage from "./not-found-page.kpa";
import PhilosophyPage from "./philosophy-page.kpa";
import StartPage from "./start-page.kpa";
import SupportPage from "./support-page.kpa";

export const registerPages = (): void => {
  Core.take(HomePage, "home-page");
  Core.take(EcosystemPage, "ecosystem-page");
  Core.take(PhilosophyPage, "philosophy-page");
  Core.take(StartPage, "start-page");
  Core.take(SupportPage, "support-page");
  Core.take(NotFoundPage, "not-found-page");
};
