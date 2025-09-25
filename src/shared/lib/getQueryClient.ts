import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서는 클라이언트에서 즉시 refetch하는 것을 방지하기 위해 staleTime을 설정
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // 서버: 항상 새로운 QueryClient 생성
    return makeQueryClient();
  } else {
    // 클라이언트: 싱글톤 유지
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
