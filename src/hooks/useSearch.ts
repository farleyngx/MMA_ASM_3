import { useState, useCallback, useRef } from "react";
import { tmdbService } from "../services/tmdb";
import { Movie } from "../types";

export const useSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use refs to stabilize search callback reference
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const queryRef = useRef("");

  const search = useCallback(async (query: string, loadNextPage = false) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setMovies([]);
      pageRef.current = 1;
      hasMoreRef.current = true;
      queryRef.current = "";
      return;
    }

    // New search request
    if (!loadNextPage) {
      setLoading(true);
      setError(null);
      pageRef.current = 1;
      hasMoreRef.current = true;
      queryRef.current = cleanQuery;
    } else {
      if (loadingMore || !hasMoreRef.current) return;
      setLoadingMore(true);
    }

    try {
      const targetPage = loadNextPage ? pageRef.current + 1 : 1;
      const response = await tmdbService.searchMovies(cleanQuery, targetPage);
      const results = response.data.results || [];

      setMovies((prev) => (loadNextPage ? [...prev, ...results] : results));
      pageRef.current = targetPage;
      hasMoreRef.current = targetPage < response.data.total_pages;
    } catch (err: any) {
      console.error("Error searching movies:", err);
      if (!loadNextPage) setError(err?.message || "Không thể tìm kiếm phim");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [loadingMore]);

  return { movies, loading, loadingMore, error, search, hasMore: hasMoreRef.current };
};
