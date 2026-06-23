import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useSearch } from "../hooks/useSearch";
import { SearchBar } from "../components/common/SearchBar";
import { MovieCard } from "../components/movie/MovieCard";
import { Loader } from "../components/common/Loader";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { movies, loading, error, search } = useSearch();

  // Debounced search trigger to prevent rapid API requests
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search(query);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, search]);

  return (
    <View className="flex-1 bg-netflix-black">
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm kiếm phim theo tên..."
        onClear={() => setQuery("")}
      />

      {loading && movies.length === 0 ? (
        <Loader message="Đang tìm kiếm phim..." />
      ) : error ? (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-gray-500 text-base text-center">{error}</Text>
        </View>
      ) : query.trim() === "" ? (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-gray-500 text-base text-center">Nhập tên phim để tìm kiếm</Text>
        </View>
      ) : movies.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-gray-500 text-base text-center">Không tìm thấy phim phù hợp</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <View className="flex-1 items-center mb-2">
              <MovieCard movie={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
