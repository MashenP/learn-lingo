import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    build: {
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {
                            name: 'firebase',
                            test: /node_modules\/(?:@firebase|firebase)\//,
                            priority: 20,
                        },
                    ],
                },
            },
        },
    },
});
