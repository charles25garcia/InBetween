import * as environmentLocal from "./_environements/environment.local";
import * as environmentDev from "./_environements/environment.dev";
import * as environmentQA from "./_environements/environment.qa";
import * as environmentUAT from "./_environements/environment.uat";
import * as environmentPROD from "./_environements/environment.prod";

let environment: typeof environmentLocal;

switch (process.env?.INBETWEEN_ENV) {
  case "local":
    environment = environmentLocal;
    break;
  case "dev":
    environment = environmentDev;
    break;
  case "qa":
    environment = environmentQA;
    break;
  case "uat":
    environment = environmentUAT;
    break;
  case "production":
    environment = environmentPROD;
    break;
  default:
    environment = environmentLocal;
    break;
}
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
    "nuxt-security",
  ],
  runtimeConfig: {
    public: {
      ...environment,
    },
  },
  css: [
    "@/assets/sass/globals.sass",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  build: { transpile: ["@fortawesome/vue-fontawesome"] },
  ssr: false,
  security: {
    contentSecurityPolicy: {
      "base-uri": ["'self'"],
      "font-src": ["'self'", "https:", "data:"],
      "form-action": ["'self'"],
      "frame-ancestors": ["'self'"],
      "img-src": ["'self'", "data:"],
      "object-src": ["'none'"],
      "script-src-attr": ["'none'"],
      "style-src": ["'self'", "https:", "'unsafe-inline'"],
      "upgrade-insecure-requests": true,
    },
  },
});
