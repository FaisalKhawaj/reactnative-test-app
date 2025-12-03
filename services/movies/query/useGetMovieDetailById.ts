import { movieApi } from "@/services/api/movieApi";
import { useQuery } from "@tanstack/react-query";
import { MovieDetailDto } from "./types";



const getMovieDetail=async(id:number):Promise<MovieDetailDto>=>{
    console.log('id',id)
   const {data}= await movieApi.get(`/movie/${id}`);
   return data;
}

export const useGetMovieDetailById=(id:number)=>{
    return useQuery<MovieDetailDto>({
        queryKey:['movie-detail',id],
        queryFn:()=>getMovieDetail(Number(id)),
        enabled:!!id,
    })
}