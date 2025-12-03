

export type FetchWatchListArgs = {
  pageParam?: number;
  accountId: number | string;
  language?: string;
  sortBy?: string;
};

export type BelongsToCollectionDto = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type ProductionCompanyDto = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountryDto = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguageDto = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type GenreItemDto={
  id:number;
  name:string;
}

export type MovieDetailDto = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollectionDto | null;
  budget: number;
  genres: GenreItemDto[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country?: string[]; // sometimes present on some responses
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyDto[];
  production_countries: ProductionCountryDto[];
  release_date: string; // ISO date string
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguageDto[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type WatchListMovieItemDto = {
  adult: boolean;
  backdrop_path: string | null;      // can be null from TMDB
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;        // can be null from TMDB
  release_date: string;              // ISO date string e.g. "2012-02-01"
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};



export type WatchListResponse = {
  page: number;
  results: WatchListMovieItemDto[];
  total_pages: number;
  total_results: number;
};

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