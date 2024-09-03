import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: ["./src/schema.graphql", "./src/localSchema.graphql"],
  documents: "src/**/*.{ts,tsx}",
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  generates: {
    "./src/__generated__/types.ts": {
      plugins: ["typescript"],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        defaultScalarType: "unknown",
        namingConvention: {
          typeNames: "keep",
          enumValues: "change-case-all#upperCase",
        },
      },
    },
    "./": {
      preset: "near-operation-file",
      plugins: ["typescript-operations"],
      presetConfig: {
        baseTypesPath: "./src/__generated__/types.ts",
        extension: ".types.ts",
        folder: "__generated__",
        importTypesNamespace: "GraphQLTypes",
      },
      config: {
        dedupeOperationSuffix: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        namingConvention: {
          typeNames: "keep",
          enumValues: "change-case-all#upperCase",
        },
      },
    },
  },
};

export default config;
