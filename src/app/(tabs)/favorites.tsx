import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useFavorites } from "../../hooks/useFavorites";
import { tmdbService } from "../../services/tmdb";
import { Movie } from "../../types";
import { MovieCard } from "../../components/movie/MovieCard";
import { Loader } from "../../components/common/Loader";

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
  }, [favorites, favoritesLoading]);

  if (favoritesLoading || (loading && movies.length === 0)) {
    return <Loader message="Đang tải danh sách phim yêu thích..." />;
  }

  return (
    <View className="flex-1 bg-netflix-black">
      {movies.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-white text-lg font-bold mb-2">Danh sách yêu thích trống</Text>
          <Text className="text-gray-500 text-sm text-center">
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
    </View>
  );
}
