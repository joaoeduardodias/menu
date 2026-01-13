import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "http://localhost:3333/docs/json",
    output: {
      target: "./src/lib/api/generated.ts",
      schemas: "./src/lib/api/model",
      client: "fetch",
      clean: true,
      override: {
        mutator: {
          path: "./src/utils/ky-client.ts",
          name: "customInstanceMutator"
        }
      }
    }
  }
});
