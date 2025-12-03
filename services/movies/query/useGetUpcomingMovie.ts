

import { movieApi } from '@/services/api/movieApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UpcomingMoviesResponse } from './types';




const fetchUpcomingMovies = async ({
    pageParam = 1,
    language = "en-US",
  }: {
    pageParam?: number;
    language?: string;
  }): Promise<UpcomingMoviesResponse> => {
    const { data } = await movieApi.get<UpcomingMoviesResponse>(
      "/movie/upcoming",
      {
        params: {
          page: pageParam,
          language,
        },
      }
    );
  
    return data;
  };

  export function useUpcomingMovies(language = "en-US") {
    return useInfiniteQuery<UpcomingMoviesResponse>({
      queryKey: ["tmdb", "upcoming-movies", { language }],
      queryFn: ({ pageParam=1 }) => fetchUpcomingMovies({ pageParam:Number(pageParam), language }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        // if there are more pages, return the next page number
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        // no more pages
        return undefined;
      },
    });
  }