const withTM = require("next-transpile-modules")(["@pbkit-devtools/core"]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  basePath: process.env.BASE_PATH || "",
  pageExtensions: ["page.tsx"],
});
