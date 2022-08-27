import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        baseUrl:
            process.env.NODE_ENV === 'ci'
                ? 'http://localhost:5000'
                : 'http://localhost:3000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
