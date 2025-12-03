import { fonts } from "@/hooks/useCacheResource";
import { UpcomingMovieItemDto } from "@/services/movies/query/types";
import { router } from "expo-router";
import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { LazyImage } from "./LazyImage";

type Props = {
  item: UpcomingMovieItemDto;
};

export const UpcomingMovieItem = memo(({ item }: Props) => {
  console.log('item',item)
  const path = item.backdrop_path || item.poster_path;

  const url = useMemo(() => {
    if (!path) return undefined;
    return `${process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${path}`;
  }, [path]);

  if (!url) return null;
console.log('url',url)
  return (
    <Pressable onPress={()=>router.push({pathname:'/movie-detail',params:{
      id:item.id
    }})} style={styles.wrap}>
      <LazyImage uri={url} height={200} width={"100%"} borderRadius={10} />

      <Text numberOfLines={3} style={styles.title}>
        {item?.title}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  wrap: {

  },
  title: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: "80%",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: fonts.poppins.medium,
  },
});
