import React, { useEffect, useState } from "react";
import { FlatList, Text, View, KeyboardAvoidingView, Platform, Keyboard, Pressable, ActivityIndicator } from "react-native";
import { Loader } from "../components/common/Loader";
import { SearchBar } from "../components/common/SearchBar";
import { MovieCard } from "../components/movie/MovieCard";
import { MovieCardSkeleton } from "../components/movie/MovieCardSkeleton";
import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { movies, loading, loadingMore, error, search } = useSearch();

  // Debounced search trigger to prevent rapid API requests
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search(query);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-netflix-black mb-16"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View className="flex-1">
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm kiếm phim theo tên..."
          onClear={() => setQuery("")}
        />

        {loading && movies.length === 0 ? (
          <FlatList
            data={Array.from({ length: 9 })}
            renderItem={() => (
              <View className="flex-1 items-center mb-2">
                <MovieCardSkeleton />
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16 }}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          />
        ) : error ? (
          <Pressable className="flex-1" onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-start items-center p-6 mt-16">
              <Text className="text-gray-500 text-xl text-center">{error}</Text>
            </View>
          </Pressable>
        ) : query.trim() === "" ? (
          <Pressable className="flex-1" onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-start items-center p-6 mt-16">
              <Text className="text-gray-500 text-xl">Nhập tên phim để tìm kiếm</Text>
            </View>
          </Pressable>
        ) : movies.length === 0 ? (
          <Pressable className="flex-1" onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-start items-center p-6 mt-16">
              <Text className="text-gray-500 text-xl">Không tìm thấy phim phù hợp</Text>
            </View>
          </Pressable>
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
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            onEndReached={() => {
              if (query.trim()) {
                search(query, true);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <View className="py-4">
                  <ActivityIndicator size="small" color="#E50914" />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
