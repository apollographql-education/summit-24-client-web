import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { PageError } from "../components/PageError";
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";

export function Root() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <ErrorBoundary
        fallbackRender={({ error }) => <PageError error={error} />}
      >
        <Nav />
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  );
}
