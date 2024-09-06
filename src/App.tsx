import { RouterProvider } from "react-router-dom";
import { router } from "./router";
// import { PageSpinner } from "./components/PageSpinner";

export default function App() {
  return <RouterProvider router={router} />;
}
