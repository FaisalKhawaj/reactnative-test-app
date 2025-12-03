import { movieApi } from "@/services/api/movieApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { WatchListResponse } from "./types";

type FetchWatchListArgs = {
  pageParam?: number;
  accountId: number | string;
  language?: string;
  sortBy?: string;
};

const getWatchList = async ({
  pageParam = 1,
  accountId,
  language = "en-US",
  sortBy = "created_at.asc",
}: FetchWatchListArgs): Promise<WatchListResponse> => {
  console.log('accountId',accountId)
  const { data } = await movieApi.get<WatchListResponse>(
    `/account/${accountId}/watchlist/movies`,
    {
      params: {
        language,
        page: pageParam,
        sort_by: sortBy,
      },
    }
  );
console.log('getWatchList data',data)
  return data;
};


export function useGetWatchList(
    accountId: number | string,
    language = "en-US",
    sortBy = "created_at.asc"
  ) {
    return useInfiniteQuery<WatchListResponse>({
      queryKey: ["tmdb", "watchlist", { accountId, language, sortBy }],
      queryFn: ({ pageParam = 1 }) =>
        getWatchList({ pageParam: Number(pageParam), accountId, language, sortBy }),
      initialPageParam: 1,
      refetchOnMount:'always',
      enabled: !!accountId, // don't run until you have an account id
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });
  }