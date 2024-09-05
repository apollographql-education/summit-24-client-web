import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { preloadQuery } from "../apollo/preloadQuery";
import {
  GetMyProfileQuery,
  GetMyProfileQueryVariables,
} from "./__generated__/root.types";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Suspense } from "react";
import { PageSpinner } from "../components/PageSpinner";
import { Box } from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { GlobalSpinner } from "../components/GlobalSpinner";

export const GET_USER: TypedDocumentNode<
  GetMyProfileQuery,
  GetMyProfileQueryVariables
> = gql`
  query GetMyProfile {
    me {
      id
      profilePicture
    }
  }
`;

export function loader() {
  return preloadQuery(GET_USER, { errorPolicy: "ignore" });
}

export default function Root() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  const user = data?.me;

  return (
    <>
      {loading && <GlobalSpinner />}
      <Nav user={user} />
      <Suspense fallback={<PageSpinner />}>
        <Box opacity={loading ? 0.5 : 1} transition="0.15s opacity ease-out">
          <Outlet />
        </Box>
      </Suspense>
    </>
  );
}
