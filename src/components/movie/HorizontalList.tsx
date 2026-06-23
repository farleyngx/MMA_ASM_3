import React from "react";
import { View, Text, FlatList } from "react-native";
import { Movie } from "../../types";
import { MovieCard } from "./MovieCard";

interface HorizontalListProps {
  title: string;
  movies: Movie[];
}

export const HorizontalList: React.FC<HorizontalListProps> = ({ title, movies }) => {
  return (
    <View className="mb-6 pl-4">
      <Text className="text-white text-lg font-bold mb-3 tracking-wide">
        {title}
      </Text>
      {movies.length === 0 ? (
        <Text className="text-gray-500 text-sm py-2">Chưa có phim nào trong danh sách này.</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};
