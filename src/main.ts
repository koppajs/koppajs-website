import "./style.css";

import { Core } from "@koppajs/koppajs-core";
import {
  KoppajsRouter,
  KOPPAJS_ROUTE_CHANGE_EVENT,
  setDocumentDescription,
} from "@koppajs/koppajs-router";
import { registerDocumentation } from "koppajs-documentation";
import {
  getDocumentationRouteMeta,
} from "koppajs-documentation";
import {
  getDocumentationRouteMap,
  installDocumentationRouteMap,
} from "koppajs-documentation/routes";
import {
  getKoppaLocale,
  KOPPAJS_LOCALE_CHANGE_EVENT,
  syncKoppaDocumentLanguage,
} from "koppajs-documentation/i18n";

import { appRoutes } from "./app-routes";
import { registerComponents } from "./components";
import { registerPages } from "./pages";
import { getSiteRouteMeta } from "./site-config";

const waitForOutlet = async (root: ParentNode): Promise<HTMLElement> =>
  new Promise<HTMLElement>((resolve, reject) => {
    const existing = root.querySelector<HTMLElement>("#app-outlet");

    if (existing) {
      resolve(existing);
      return;
    }

    const observer = new MutationObserver(() => {
      const outlet = root.querySelector<HTMLElement>("#app-outlet");

      if (!outlet) {
        return;
      }

      observer.disconnect();
      resolve(outlet);
    });

    observer.observe(root, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error("App outlet not found."));
    }, 5_000);
  });

registerComponents();
registerPages();
registerDocumentation();
installDocumentationRouteMap({
  basePath: "/docs",
  pathStyle: "flat",
});
Core();

const root =
  document.querySelector("app-shell") ??
  document.body.appendChild(document.createElement("app-shell"));

const outlet = await waitForOutlet(root);

const router = new KoppajsRouter({
  routes: appRoutes,
  outlet,
  root: document,
  basePath: import.meta.env.BASE_URL,
  scrollBehavior: "auto",
});

router.init();
syncWebsiteMetadata(router.getCurrentRoute().path);
document.documentElement.classList.add("app-ready");

if ("addEventListener" in window) {
  window.addEventListener(KOPPAJS_ROUTE_CHANGE_EVENT, (event) => {
    syncWebsiteMetadata(
      (event as CustomEvent<{ path?: string }>).detail?.path ??
        router.getCurrentRoute().path,
    );
  });

  window.addEventListener(KOPPAJS_LOCALE_CHANGE_EVENT, () => {
    const currentRoute = router.getCurrentRoute();

    router.navigate(currentRoute.fullPath, { replace: true, scroll: false });
    syncWebsiteMetadata(currentRoute.path);
  });
}

function syncWebsiteMetadata(path: string): void {
  const documentationRoutePath = Object.entries(getDocumentationRouteMap()).find(
    ([, mappedPath]) => mappedPath === path,
  )?.[0];

  const metadata = documentationRoutePath
    ? getDocumentationRouteMeta(documentationRoutePath, getKoppaLocale())
    : getSiteRouteMeta(path, getKoppaLocale());

  document.title = metadata.title;
  setDocumentDescription(document, metadata.description);
  syncKoppaDocumentLanguage(document);
}
