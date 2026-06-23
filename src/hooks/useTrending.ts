import { useEffect, useState, useCallback, useRef } from "react";
import { tmdbService } from "../services/tmdb";
import { Movie } from "../types";

export const useTrending = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use refs to stabilize trending callback reference
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);

  const fetchTrending = useCallback(async (loadNextPage = false) => {
    if (loadNextPage) {
      if (loadingMore || !hasMoreRef.current) return;
      setLoadingMore(true);
    } else {
      setLoading(true);
      setError(null);
      pageRef.current = 1;
      hasMoreRef.current = true;
    }

    try {
      const targetPage = loadNextPage ? pageRef.current + 1 : 1;
      const response = await tmdbService.getTrendingMovies(targetPage);
      const results = response.data.results || [];

      setMovies((prev) => (loadNextPage ? [...prev, ...results] : results));
      pageRef.current = targetPage;
      hasMoreRef.current = targetPage < response.data.total_pages;
    } catch (err: any) {
      console.error("Error fetching trending movies:", err);
      if (!loadNextPage) setError(err?.message || "Không thể tải danh sách phim thịnh hành");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [loadingMore]);

  useEffect(() => {
    fetchTrending(false);
  }, []);

  return {
    movies,
    loading,
    loadingMore,
    error,
    refetch: () => fetchTrending(false),
    loadMore: () => fetchTrending(true),
    hasMore: hasMoreRef.current,
  };
};

