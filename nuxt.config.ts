// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    // Generated at build time for SEO purpose
    "/": { prerender: true },
    "/assets/css/*": { cache: { maxAge: 60 * 60 } },
    "/_nuxt/assets/css/*": { cache: { maxAge: 60 * 60 } },
  },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  },
  app: {
    head: {
      title: "Checkin",
      htmlAttrs: {
        lang: "th",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        { hid: "description", name: "description", content: "Checkin" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "nuxt-headlessui"],
  headlessui: {
    prefix: "",
  },

  tailwindcss: {
    viewer: false,
    config: {
      variants: {
        extend: {
          display: ["group-hover"],
        },
      },
      darkMode: "class",
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
      ],
      theme: {
        extend: {
          keyframes: {
            "fade-in": {
              from: {
                opacity: "0",
              },
              to: {
                opacity: "1",
              },
            },
            "fade-out": {
              from: {
                opacity: "1",
              },
              to: {
                opacity: "0",
              },
            },
          },
          animation: {
            "fade-in": "fade-in 0.15s ease-out",
            "fade-out": "fade-out 0.2s ease-out",
          },
        },
      },
    },
  },
  devtools: { enabled: false },
});
