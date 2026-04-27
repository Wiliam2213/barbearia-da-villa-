// @lovable.dev/vite-tanstack-config already includes the core TanStack/Vite plugins.
// For Vercel we disable the Cloudflare build adapter and add Nitro's Vercel output adapter.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    prerender: {
      enabled: false,
    },
  },
  plugins: [nitro({ preset: "vercel" })],
});
