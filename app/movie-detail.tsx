import { BackIcon, PlayIcon } from "@/assets/icons";
import { GenreChips } from "@/components/GenreChips";
import { fonts } from "@/hooks/useCacheResource";
import { GenreItemDto } from "@/services/movies/query/types";
import { useGetMovieDetailById } from "@/services/movies/query/useGetMovieDetailById";
import { globalStyles } from "@/styles/globalStyles";
import { ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function MovieDetail() {
    const { id } = useLocalSearchParams();

    const { data,isLoading,isFetching, } = useGetMovieDetailById(Number(id));

    const path = data?.backdrop_path || data?.poster_path;

    const url = useMemo(() => {
        if (!path) return undefined;
        return `${process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${path}`;
    }, [path]);

    const isDataLoading = isLoading || (!data && isFetching);
console.log('data',data)

    if(isDataLoading){
        return(
            <SafeAreaView
            edges={['top', 'bottom']}
            style={globalStyles.screenWrap}>
                <ActivityIndicator size={20} color={'#61C3F2'} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView
            edges={['top', 'bottom']}
            style={globalStyles.screenWrap}>

            <ImageBackground
                priority='high'
                source={{ uri: url }}
                style={style.imgBgStyle}
                imageStyle={{
                    width: '100%',
                }}>

                <Pressable onPress={() => router.back()} style={style.headerButtonWrap}>
                    <BackIcon />
                    <Text style={style.headerText}>Watch</Text>
                </Pressable>

                <View style={style.imgBgFooterWrap}>
                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: fonts.poppins.medium, }}>
                        In Theatres {data?.release_date}
                    </Text>
                    <Pressable onPress={()=>router.push('/tickets')} style={style.getTicketButton}>
                        <Text style={style.getTicketButtonText}>Get Tickets</Text>
                    </Pressable>

                    <Pressable style={style.watchTrailerButton}>
                        <PlayIcon />
                        <Text style={style.getTicketButtonText}>Watch Trailer</Text>
                    </Pressable>
                </View>

            </ImageBackground>

            <ScrollView style={{ padding: 40 }}>
                <Text style={style.genresTitle}>Genres</Text>

                <View style={style.chipMainWrap}>
                    {data?.genres.map((genre: GenreItemDto) => {
                        return (
                            <GenreChips key={genre.id} genre={genre} />
                        )
                    }
                    )

                    }
                </View>
                <View style={{ marginTop: 40 }} />
                <Text style={style.genresTitle}>Overview</Text>
                <View style={{ marginTop: 14 }} />

                <Text style={style.overviewVal}>{data?.overview}</Text>
            </ScrollView>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    imgBgStyle: {
        paddingVertical: 30,
        height: Dimensions.get('screen').height / 2,
        justifyContent: 'space-between',
    },
    headerButtonWrap: {
        flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', gap: 20
    }, headerText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.poppins.medium,
    },
    imgBgFooterWrap: {
        width: '80%', alignSelf: 'center',
    },
    getTicketButton: {
        backgroundColor: '#61C3F2',
        marginTop: 10,
        borderRadius: 10,
        width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'
    },
    getTicketButtonText: {
        color: '#fff', fontSize: 14, fontFamily: fonts.poppins.bold,
    },
    watchTrailerButton: {
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center',
        borderColor: '#61C3F2',
        borderWidth: 1,
    },
    genresTitle: {
        fontSize: 18, lineHeight: 24,
        fontFamily: fonts.poppins.medium,
    },
    chipMainWrap: {
        flexDirection: 'row', paddingVertical: 22, gap: 5, flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3'
    },
    overviewVal: {
        color: '#8F8F8F',
        fontSize: 12,
        lineHeight: 20,
        fontFamily: fonts.poppins.medium,
    }

})