import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { PageError } from "../components/PageError";
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";

/* Docs for react-error-boundary:
 * https://github.com/bvaughn/react-error-boundary
 *
 * We can leverage our <PageError /> component by using the fallbackRender prop:
 *
 * <ErrorBoundary fallbackRender={({ error }) => <PageError error={error} />}>
 *   {children}
 * </ErrorBoundary>
 */

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
