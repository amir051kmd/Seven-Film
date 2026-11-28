import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
   runtimeConfig: {
    wambeshaApiKey: '',
    wambeshaBaseUrl: 'https://api.wambesha.com/v1'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});