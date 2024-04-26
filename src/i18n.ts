import express from "express";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import path from "path";

async function initializeI18n(app: express.Application) {
  console.log(path.join(__dirname, "locales"));
  await i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(Backend)
    .init({
      preload: ["en", "cy"],
      fallbackLng: "en",
      supportedLngs: ["en", "cy"],
      ns: ["common"],
      backend: {
        loadPath: `${path.join(__dirname, "locales")}/{{lng}}/{{ns}}.json`,
      },
      detection: {
        order: ["querystring", "cookie", "header"],
        lookupQuerystring: "lng",
        lookupCookie: "i18next",
        lookupHeader: "accept-language",
        caches: ["cookie"],
      },
    });

  app.use(i18nextMiddleware.handle(i18next));
}

export { initializeI18n };
