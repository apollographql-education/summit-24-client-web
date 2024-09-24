import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import theme from "./styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "./apollo/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </ChakraProvider>,
);
