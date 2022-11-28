import { defineConfig } from 'cypress';
import coverageTask from '@cypress/code-coverage/task';

export default defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        baseUrl:
            process.env.NODE_ENV === 'ci'
                ? 'http://localhost:5000'
                : 'http://localhost:5000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
            coverageTask(on, config);
            return config;
        },
    },
});
