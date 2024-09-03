import App from "./App";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import theme from "./theme.js";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "./apolloClient";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>
);
