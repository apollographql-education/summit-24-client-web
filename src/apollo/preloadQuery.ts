import { createQueryPreloader } from "@apollo/client";
import { client } from "./client";

/* Exercise 8
 *
 * Create and export a preloadQuery function using createQueryPreloader.
 *
 * Docs on creating a query preloader function:
 * https://www.apollographql.com/docs/react/data/suspense#initiating-queries-outside-react
 */

export const preloadQuery = createQueryPreloader(client);
