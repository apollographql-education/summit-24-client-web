import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageContainerProps {
  children?: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Container maxW="container.xl" mb={24}>
      {children}
    </Container>
  );
}
