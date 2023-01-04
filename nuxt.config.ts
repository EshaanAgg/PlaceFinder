export default defineNuxtConfig({
  app: {
    head: {
      title: "PathFinder",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css",
        },
      ],
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`,
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
  },
});
