import { createQueryPreloader } from "@apollo/client";
import { client } from "./client";

export const preloadQuery = createQueryPreloader(client);
