import "./style.css";

import { Core } from "@koppajs/koppajs-core";
import { KoppajsRouter } from "@koppajs/koppajs-router";

import { appRoutes } from "./app-routes";
import { registerComponents } from "./components";
import { registerPages } from "./pages";

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
document.documentElement.classList.add("app-ready");
