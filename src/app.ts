import express from "express";
import nunjucks from "nunjucks";
import { initializeI18n } from "./i18n";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

(async function run() {
  await initializeI18n(app);

  app.get("/", (req, res) => {
    res.render("index.njk", { t: req.t });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
