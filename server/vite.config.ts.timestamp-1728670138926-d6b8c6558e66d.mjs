// vite.config.ts
import build from "file:///D:/Desarrollo/Comercial/Ghouglify/server/node_modules/.pnpm/@hono+vite-build@1.1.0_hono@4.6.4/node_modules/@hono/vite-build/dist/adapter/cloudflare-pages/index.js";
import devServer from "file:///D:/Desarrollo/Comercial/Ghouglify/server/node_modules/.pnpm/@hono+vite-dev-server@0.15.2_hono@4.6.4_miniflare@3.20241004.0_wrangler@3.80.4_@cloudflare+workers-types@4.20241004.0_/node_modules/@hono/vite-dev-server/dist/index.js";
import adapter from "file:///D:/Desarrollo/Comercial/Ghouglify/server/node_modules/.pnpm/@hono+vite-dev-server@0.15.2_hono@4.6.4_miniflare@3.20241004.0_wrangler@3.80.4_@cloudflare+workers-types@4.20241004.0_/node_modules/@hono/vite-dev-server/dist/adapter/cloudflare.js";
import { defineConfig } from "file:///D:/Desarrollo/Comercial/Ghouglify/server/node_modules/.pnpm/vite@5.4.8_@types+node@22.7.5/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: "src/index.tsx"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXNhcnJvbGxvXFxcXENvbWVyY2lhbFxcXFxHaG91Z2xpZnlcXFxcc2VydmVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEZXNhcnJvbGxvXFxcXENvbWVyY2lhbFxcXFxHaG91Z2xpZnlcXFxcc2VydmVyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EZXNhcnJvbGxvL0NvbWVyY2lhbC9HaG91Z2xpZnkvc2VydmVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGJ1aWxkIGZyb20gJ0Bob25vL3ZpdGUtYnVpbGQvY2xvdWRmbGFyZS1wYWdlcydcbmltcG9ydCBkZXZTZXJ2ZXIgZnJvbSAnQGhvbm8vdml0ZS1kZXYtc2VydmVyJ1xuaW1wb3J0IGFkYXB0ZXIgZnJvbSAnQGhvbm8vdml0ZS1kZXYtc2VydmVyL2Nsb3VkZmxhcmUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgYnVpbGQoKSxcbiAgICBkZXZTZXJ2ZXIoe1xuICAgICAgYWRhcHRlcixcbiAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzeCdcbiAgICB9KVxuICBdXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVCxPQUFPLFdBQVc7QUFDdFUsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sYUFBYTtBQUNwQixTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsTUFDUjtBQUFBLE1BQ0EsT0FBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
