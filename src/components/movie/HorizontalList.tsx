import React from "react";
import { FlatList, Text, View } from "react-native";
import { Movie } from "../../types";
import { MovieCard } from "./MovieCard";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

interface HorizontalListProps {
  title: string;
  movies?: Movie[];
  loading?: boolean;
}

export const HorizontalList: React.FC<HorizontalListProps> = ({ title, movies = [], loading = false }) => {
  return (
    <View className="mb-6 pl-4">
      <Text className="text-white text-lg font-bold mb-3 tracking-wide">
        {title}
      </Text>
      {loading ? (
        <FlatList
          data={Array.from({ length: 5 })}
          renderItem={() => (
            <View className="flex-1 items-center mx-2">
              <MovieCardSkeleton />
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : movies.length === 0 ? (
        <Text className="text-gray-500 text-sm py-2">Chưa có phim nào trong danh sách này.</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <View className="flex-1 items-center mx-2">
              <MovieCard movie={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};
