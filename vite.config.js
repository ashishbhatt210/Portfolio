import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Serves the /api/*.js Vercel-style handlers inside `vite dev` so no second
// server (vercel dev) is required for local development.
function apiRoutesPlugin() {
  return {
    name: "vite-api-routes",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/")) return next();

        const endpoint = req.url.split("?")[0].replace(/^\/api\//, "");
        const handlerPath = path.resolve(process.cwd(), "api", `${endpoint}.js`);

        // Buffer body for POST/PUT
        if (req.method !== "GET" && req.method !== "OPTIONS") {
          let body = "";
          for await (const chunk of req) body += chunk;
          try { req.body = body ? JSON.parse(body) : {}; }
          catch { req.body = {}; }
        }

        // Vercel-style res helpers
        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (obj) => {
          if (!res.getHeader("Content-Type")) {
            res.setHeader("Content-Type", "application/json");
          }
          res.end(JSON.stringify(obj));
          return res;
        };

        try {
          const mod = await server.ssrLoadModule(handlerPath);
          await mod.default(req, res);
        } catch (err) {
          console.error("[api]", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err?.message || "Internal server error" }));
          } else {
            try { res.end(); } catch {}
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Make .env / .env.local available to server-side API handlers.
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiRoutesPlugin()],
    server: { port: 5173 },
    build: { outDir: "dist", sourcemap: false },
  };
});
