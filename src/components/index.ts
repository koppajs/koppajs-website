import { Core } from "@koppajs/koppajs-core";

import AppShell from "./app-shell.kpa";
import SiteFooter from "./site-footer.kpa";
import SiteHeader from "./site-header.kpa";

export const registerComponents = (): void => {
  Core.take(AppShell, "app-shell");
  Core.take(SiteHeader, "site-header");
  Core.take(SiteFooter, "site-footer");
};
