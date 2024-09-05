import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import {
  GetMyProfileQuery,
  GetMyProfileQueryVariables,
} from "./__generated__/root.types";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";

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

export default function Root() {
  const { data } = useQuery(GET_USER, { errorPolicy: "ignore" });

  const user = data?.me;

  return (
    <>
      <Nav user={user} />
      <Outlet />
    </>
  );
}
