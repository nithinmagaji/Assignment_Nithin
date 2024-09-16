const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        clearSessions() {
          // Task to clear sessions if necessary
        }
      });    },
    baseUrl:"https://sweetshop.netlify.app/"

  },
   // Global configuration options
   viewportWidth: 1280,
   viewportHeight: 720,
   // Configure default timeout
   defaultCommandTimeout: 8000,
   // Enable or disable video recording
   video: true,
});
