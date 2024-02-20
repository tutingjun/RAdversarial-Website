import { defineConfig } from "astro/config";
import relativeLinks from "astro-relative-links";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import type { AstroIntegration } from "astro";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    relativeLinks() as AstroIntegration,
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  outDir: "./dist/adversarial",
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    inlineStylesheets: `always`,
    // assetsPrefix: "..",
  },
  trailingSlash: "always",
});
