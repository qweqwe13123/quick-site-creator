// Standalone Vite config — no third-party platform dependencies.
// Builds and deploys anywhere (Vercel / Netlify / VPS / Docker / Railway /
// Render). All secrets are read from environment variables (.env).
import { defineConfig, loadEnv, type PluginOption } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Detect a hosted preview sandbox (Cloudflare Workers runtime) purely from
// env vars so the local/standalone build path stays the default.
const isSandbox =
  process.env.LOVABLE_SANDBOX === "1" || !!process.env.DEV_SERVER__PROJECT_PATH;

export default defineConfig(({ command, mode }) => {
  // Inject VITE_* env vars into import.meta.env for both client and SSR bundles.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Block server-only modules from leaking into the client bundle.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Use src/server.ts as the SSR entry (our error-wrapping handler).
      server: { entry: "server" },
    }),
    viteReact(),
  ];

  // Nitro generates the deployable server output at build time.
  if (command === "build") {
    if (isSandbox) {
      // Hosted preview runs on Cloudflare Workers.
      plugins.push(
        nitro({
          preset: "cloudflare-module",
          output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
          cloudflare: { nodeCompat: true, deployConfig: true },
        }),
      );
    } else {
      // Standalone deploys: pick the target via NITRO_PRESET.
      //   Vercel  -> NITRO_PRESET=vercel        (set in vercel.json)
      //   Netlify -> NITRO_PRESET=netlify       (set in netlify.toml)
      //   VPS/Docker/Railway/Render -> defaults to "node-server"
      plugins.push(nitro({ preset: process.env.NITRO_PRESET || "node-server" }));
    }
  }

  return {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: { host: "::", port: 8080, strictPort: isSandbox },
    plugins,
  };
});
