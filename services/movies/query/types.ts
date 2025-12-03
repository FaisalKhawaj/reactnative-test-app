export type UpcomingMovieItemDto = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    original_title: string;
    original_language: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    video: boolean;
  };


export type UpcomingMoviesResponse = {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: UpcomingMovieItemDto[];
    total_pages: number;
    total_results: number;
  };