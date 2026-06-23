import { useEffect, useState } from "react";
import { tmdbService } from "../services/tmdb";
import { Movie } from "../types";

export const useTrending = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tmdbService.getTrendingMovies();
      setMovies(response.data.results);
    } catch (err: any) {
      console.error("Error fetching trending movies:", err);
      setError(err?.message || "Không thể tải danh sách phim thịnh hành");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return { movies, loading, error, refetch: fetchTrending };
};
