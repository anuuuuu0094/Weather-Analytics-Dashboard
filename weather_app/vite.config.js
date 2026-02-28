// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//     server: {
//     proxy: {
//       "/weatherapi": {
//         target: "https://api.weatherapi.com/v1",
//         changeOrigin: true,
//         secure: true,
//         rewrite: (path) => path.replace(/^\/weatherapi/, ""),
//       },
//     },
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base : "/",
  plugins: [react()],
});