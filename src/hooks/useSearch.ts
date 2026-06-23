import { useState, useCallback } from "react";
import { tmdbService } from "../services/tmdb";
import { Movie } from "../types";

export const useSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await tmdbService.searchMovies(query);
      setMovies(response.data.results);
    } catch (err: any) {
      console.error("Error searching movies:", err);
      setError(err?.message || "Không thể tìm kiếm phim");
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, search };
};
