import { SearchIcon } from '@/assets/icons';
import { UpcomingMovieItem } from '@/components/UpcomingMovieItem';
import { fonts } from '@/hooks/useCacheResource';
import { UpcomingMovieItemDto } from '@/services/movies/query/types';
import { useUpcomingMovies } from '@/services/movies/query/useGetUpcomingMovie';
import { globalStyles } from '@/styles/globalStyles';
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


const ItemSeparator = () => <View style={styles.itemSeparator} />;


export default function HomeScreen() {

  const { data, isLoading, isFetching, isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
    error } = useUpcomingMovies("en-US");
 

  const movies = useMemo(() => {
    if (!data?.pages) return [];

    const map = new Map<number, UpcomingMovieItemDto>();

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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

 
  const renderUpcomingMovies = useCallback(
    ({ item }: { item: UpcomingMovieItemDto }) => {
      return <UpcomingMovieItem item={item} />;
    },
    []
  );

  const ListFooter = useMemo(() => {

    //  if there are no movies 
    if (movies.length === 0) return;

    // handle pagnination loader
    if (isFetchingNextPage) {
      return (
        <SafeAreaView style={globalStyles.loadingWrap}>
          <ActivityIndicator size='small' />
        </SafeAreaView>
      )
    }
    if (hasNextPage) {
      return <View style={{ height: 12 }} />
    }
  }, [isFetchingNextPage, hasNextPage, movies])

  if (error) {
    return (
      <SafeAreaView style={globalStyles.loadingWrap}>
        <Text>Error Loading movies!!</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      edges={['top', 'bottom',]}
      style={globalStyles.screenWrap}>

      <View style={styles.headerMainWrap} >
        <Text style={styles.headerText}>Watch</Text>
        <SearchIcon />
      </View>

      <FlashList
        data={movies}
        keyExtractor={item => item?.id.toString()}
        renderItem={renderUpcomingMovies}
        style={styles.flatListStyle}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.flatListContentContainerStyle}
        onEndReached={handleLoadMore}
        ItemSeparatorComponent={() => <ItemSeparator />}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            tintColor={'#999'}
            onRefresh={refetch}
          />
        }
      />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  itemSeparator:{
    height: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerMainWrap: {
    flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', gap: 8
  },
  flatListStyle: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#f6f5fa'
  },
  flatListContentContainerStyle: {
    gap: 10,
  },
  headerText: {
    fontFamily: fonts.poppins.medium, fontSize: 20, lineHeight: 24, color: '#202C43'
  }

});
