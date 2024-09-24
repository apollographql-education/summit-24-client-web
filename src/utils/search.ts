import * as GraphQLTypes from "../__generated__/types";

export function getListingParamsFromSearchParams(
  searchParams: URLSearchParams,
) {
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  if (!checkInDate || !checkOutDate) {
    throw new Error("Could not determine dates to check");
  }

  return {
    checkInDate,
    checkOutDate,
    sortBy:
      (searchParams.get("sortBy") as GraphQLTypes.SortByCriteria | null) ??
      GraphQLTypes.SortByCriteria.COST_ASC,
    limit: 5,
    numOfBeds: parseInt(searchParams.get("numOfBeds") ?? "1", 10),
    page: parseInt(searchParams.get("page") ?? "1", 10),
  };
}
