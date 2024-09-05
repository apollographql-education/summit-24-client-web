import { useSearchParams as useRouterSearchParams } from "react-router-dom";

export function useSearchParams() {
  const [searchParams, setSearchParams] = useRouterSearchParams();

  function setParams(params: Record<string, string | number>) {
    setSearchParams((currentParams) =>
      mergeSearchParams(currentParams, params),
    );
  }

  return [searchParams, setParams] as const;
}

function mergeSearchParams(
  currentParams: URLSearchParams,
  params: Record<string, string | number>,
) {
  return new URLSearchParams(
    Object.fromEntries([
      ...Array.from(currentParams.entries()),
      ...Object.entries(params).map(([key, value]) => [key, String(value)]),
    ]),
  );
}
