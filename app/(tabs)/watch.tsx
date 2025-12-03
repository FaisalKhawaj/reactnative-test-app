import { MovieSearchbar } from "@/components/ui/movie-search-bar";
import { WatchListItem } from "@/components/WatchListItem";
import { useDebouncedValue } from "@/hooks/useDeboundedValue";
import { WatchListMovieItemDto } from "@/services/movies/query/types";
import { useGetWatchList } from "@/services/movies/query/useGetWatchList";
import { globalStyles } from "@/styles/globalStyles";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Watch() {
    const [search,setSearch]=useState('');
    const onChangeSearch=(val:string)=>{
        setSearch(val)
    }
    const debouncedSearch = useDebouncedValue(search, 400);

    const movieList = [
        {
            id: 1,
            name: 'Comedies',
            image: 'https://picsum.photos/200'
        },
        {
            id: 2,
            name: 'Dummy 2',
            image: 'https://picsum.photos/201'
        },
        {
            id: 3,
            name: 'Dummy 3',
            image: 'https://picsum.photos/202'
        },

        {
            id: 4,
            name: 'Dummy 4',
            image: 'https://picsum.photos/204'
        },
        {
            id: 5,
            name: 'Dummy 5',
            image: 'https://picsum.photos/205'
        },
        {
            id: 6,
            name: 'Dummy 9',
            image: 'https://picsum.photos/207'
        },
        {
            id: 9,
            name: 'Dummy 3',
            image: 'https://picsum.photos/209'
        },
    ];

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetWatchList("22523089");

    const watchlistMovies = useMemo(() => {
        if (!data?.pages) return [];

        const map = new Map<number, WatchListMovieItemDto>();

        data.pages.forEach((page) => {
            page.results.forEach((movie) => {
                // Note this api is returning same movies with same id on different pages so to avoid this 
                if (!map.has(movie.id)) {
                    map.set(movie.id, movie);
                }
            });
        });

        return Array.from(map.values());
    }, [data]);

    const filteredMovies=useMemo(()=>{
        if (!debouncedSearch.trim()) return watchlistMovies;
        const val = debouncedSearch.toLowerCase();

        return watchlistMovies.filter((movie) =>
            movie.title?.toLowerCase().includes(val)
          );

    },[watchlistMovies,debouncedSearch])


    console.log('watchlistMovies', watchlistMovies)


    const renderMovie = ({ item }: any) => {
        return (
            <WatchListItem item={item} />
        )
    }
    return (
        <SafeAreaView
            edges={['top', 'bottom',]}
            style={globalStyles.screenWrap}>

{/* Controlled component */}
            <MovieSearchbar
             value={search}
             onChangeText={setSearch}
            />

            <FlatList
                data={movieList}
                renderItem={renderMovie}
                numColumns={2}
                horizontal={false}
                columnWrapperStyle={style.columnContainerStyle}
                style={style.flatlistStyle}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />} // used for spacing in each cardx
                contentContainerStyle={{
               
                }}
            />


        </SafeAreaView>
    )
}

const style=StyleSheet.create({
    columnContainerStyle:{
        justifyContent: 'space-between',
        gap: 20
    },
    flatlistStyle:{
        backgroundColor: '#f6f5fa',
        padding: 20,
    }
})