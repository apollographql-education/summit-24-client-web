import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";
import { PageSpinner } from "./components/PageSpinner";

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
