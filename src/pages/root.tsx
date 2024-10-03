import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { PageError } from "../components/PageError";
import { PageSpinner } from "../components/PageSpinner";

/* Exercise 4
 *
 * Docs on React Suspense:
 * https://react.dev/reference/react/Suspense
 *
 * Docs on useSuspenseQuery:
 * https://www.apollographql.com/docs/react/data/suspense#fetching-with-suspense
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
