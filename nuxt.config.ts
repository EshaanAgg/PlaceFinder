export default defineNuxtConfig({
  app: {
    head: {
      title: "PlaceFinder",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      GEOAPIFY_KEY: process.env.GEOAPIFY_KEY,
    },
  },
});
