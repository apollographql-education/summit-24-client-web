import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: ["./src/schema.graphql", "./src/localSchema.graphql"],
  documents: "src/**/*.{ts,tsx}",
};

export default config;
