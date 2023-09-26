import { defineConfig } from "vite";
import { resolve } from "path";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  root: "src",
  build: {
    lib: {
      entry: resolve(__dirname, "src/js/theme.js"),
      name: "prestavite",
      fileName: (format) => `js/theme.js`,
      formats: ["iife"],
    },
    sourcemap: true,
    outDir: "../../assets",
    rollupOptions: {
      external: ["prestashop"],
      output: {
        globals: {
          prestashop: "prestashop",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return `css/${assetInfo.name}`;
          }
          return `js/${assetInfo.name}`;
        },
      },
    },
  },
});
