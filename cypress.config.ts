import { defineConfig } from "cypress";



export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',

  e2e: {
    baseUrl: 'https://automationintesting.online/',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
