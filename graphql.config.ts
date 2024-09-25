import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: ["./src/schema/schema.graphql", "./src/schema/localSchema.graphql"],
  documents: "src/**/*.{ts,tsx}",
};

export default config;
