import { defineConfig } from "orval";

export default defineConfig({
  myApi: {
    input: "http://localhost:3333/docs/json",
    output: {
      target: "./src/lib/api/generated.ts",
      client: "fetch",
      override: {
        mutator: {
          path: './src/utils/ky-client.ts',
          name: 'kyFetch',
        },
      },
    },
  },
});
