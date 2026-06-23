import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Loader } from "../../components/common/Loader";
import { MovieCard } from "../../components/movie/MovieCard";
import { useFavorites } from "../../hooks/useFavorites";
import { tmdbService } from "../../services/tmdb";
import { Movie } from "../../types";

export default function FavoritesScreen() {
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We want to refetch the movies whenever the favorites change.
  const loadFavoriteMovies = async () => {
    if (favorites.length === 0) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const moviePromises = favorites.map(async (id) => {
        try {
          const res = await tmdbService.getMovieDetails(id);
          return res.data;
        } catch (err) {
          console.error(`Error loading movie detail for id ${id}:`, err);
          return null;
        }
      });

      const results = await Promise.all(moviePromises);
      setMovies(results.filter((m) => m !== null) as Movie[]);
    } catch (err: any) {
      console.error("Error fetching favorite details:", err);
      setError("Không thể tải danh sách phim yêu thích");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!favoritesLoading) {
      loadFavoriteMovies();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, favoritesLoading]);

  if (favoritesLoading || (loading && movies.length === 0)) {
    return <Loader message="Đang tải danh sách phim yêu thích..." />;
  }

  return (
    
    <SafeAreaView className="flex-1 bg-netflix-black">
      {/* Custom Header */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <Text className="text-netflix-red text-[28px] font-black tracking-tighter">
          NEEDFLEX
        </Text>
        <Link href="/search" asChild>
          <TouchableOpacity className="p-2">
            <Ionicons name="search" size={26} color="#ffffff" />
          </TouchableOpacity>
        </Link>
      </View>
      {movies.length === 0 ? (
        <View className="flex justify-center items-center pt-16 mt-16">
          <Text className="text-white text-2xl font-bold mb-2">Danh sách yêu thích trống</Text>
          <Text className="text-gray-500 text-xl text-center">
            Hãy thêm các bộ phim bạn thích để xem lại sau.
          </Text>
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
    </SafeAreaView>
  );
}
