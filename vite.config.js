import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [
    vue2(),
    babel({
      babelConfig: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                ie: "11",
                chrome: "64",
                edge: "79",
                firefox: "67",
                safari: "11.1",
              },
              useBuiltIns: "entry", // Ensures that Babel adds necessary polyfills based on usage.
              corejs: 3, // Specifies the version of core-js to use for polyfills.
            },
          ],
        ],
      },
    }),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
