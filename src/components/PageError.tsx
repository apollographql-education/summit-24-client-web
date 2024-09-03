import { Center } from "@chakra-ui/react";
import { PageContainer } from "./PageContainer";

interface PageErrorProps {
  error: Error;
}

export function PageError({ error }: PageErrorProps) {
  return (
    <PageContainer>
      <Center>uhoh error! {error.message}</Center>
    </PageContainer>
  );
}
