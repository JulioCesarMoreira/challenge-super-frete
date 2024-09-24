import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://web.superfrete.com/",
    viewportWidth: 1366,
    viewportHeight: 768,
    // blockHosts: ['*analytics.google.com', '*ingest.sentry.io*', '*.clarity.ms*', '*google-analytics.com*'],
    // pageLoadTimeout: 120000
  },
});
