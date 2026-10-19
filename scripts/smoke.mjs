// Runtime smoke test: mount the docs app in jsdom and visit every route.
import { createServer } from "vite";
import { JSDOM } from "jsdom";

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: "http://localhost/#/",
  pretendToBeVisual: true,
});
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) {
  if (!(k in globalThis)) {
    try {
      globalThis[k] = w[k];
    } catch {
      /* ignore */
    }
  }
}
globalThis.window = w;
globalThis.document = w.document;
globalThis.navigator = w.navigator;
w.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
w.cancelAnimationFrame = (id) => clearTimeout(id);
globalThis.requestAnimationFrame = w.requestAnimationFrame;
globalThis.cancelAnimationFrame = w.cancelAnimationFrame;
w.scrollTo = () => {};
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const errors = [];
const origError = console.error;
console.error = (...a) => {
  const msg = a.map(String).join(" ");
  if (/not wrapped in act|ReactDOMTestUtils/.test(msg)) return;
  errors.push(msg);
  origError(...a);
};
w.addEventListener("error", (e) => errors.push("window.error: " + e.message));
process.on("unhandledRejection", (e) => errors.push("unhandledRejection: " + e));

const server = await createServer({
  configFile: "./vite.config.ts",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  await server.ssrLoadModule("/src/main.tsx");
  await sleep(300);

  const { ALL_DOCS, GUIDES } = await server.ssrLoadModule("/src/docs/registry.ts");
  const routes = ["/", ...GUIDES.map((g) => `/guide/${g.key}`), ...ALL_DOCS.map((d) => `/components/${d.key}`), "/nope"];

  const results = [];
  for (const r of routes) {
    w.location.hash = r;
    w.dispatchEvent(new w.HashChangeEvent("hashchange"));
    await sleep(120);
    const title = document.querySelector(".page__title, .hero__title")?.textContent?.trim().slice(0, 40) ?? "(none)";
    const demos = document.querySelectorAll(".demo-block").length;
    const html = document.getElementById("root").innerHTML.length;
    results.push({ route: r, title, demos, html });
  }

  // interact: click demo buttons (modal / toast / code toggle) on a few pages
  w.location.hash = "/components/modal";
  w.dispatchEvent(new w.HashChangeEvent("hashchange"));
  await sleep(100);
  for (const b of document.querySelectorAll(".demo-block__preview button")) b.click();
  await sleep(200);
  const modals = document.querySelectorAll(".pxui-modal").length;
  w.location.hash = "/components/toast";
  w.dispatchEvent(new w.HashChangeEvent("hashchange"));
  await sleep(100);
  for (const b of document.querySelectorAll(".demo-block__preview .pxui-btn")) b.click();
  await sleep(300);
  const toasts = document.querySelectorAll(".pxui-toast").length;
  w.location.hash = "/components/button";
  w.dispatchEvent(new w.HashChangeEvent("hashchange"));
  await sleep(100);
  for (const b of document.querySelectorAll(".demo-block__btn")) b.click();
  await sleep(100);
  const codes = document.querySelectorAll(".code-block").length;

  console.table(results);
  console.log({ modals, toasts, codes });
  console.log(errors.length ? `\n❌ ${errors.length} runtime error(s):\n` + errors.join("\n---\n") : "\n✅ no runtime errors");
  process.exitCode = errors.length ? 1 : 0;
} finally {
  await server.close();
}
