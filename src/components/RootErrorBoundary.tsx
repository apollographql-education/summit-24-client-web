import { useRouteError } from "react-router-dom";
import { PageError } from "./PageError";
import { PageContainer } from "./PageContainer";
import { Center } from "@chakra-ui/react";

export function RootErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <PageError error={error} />;
  }

  return (
    <PageContainer>
      <Center>Oops, something went wrong!</Center>
    </PageContainer>
  );
}
