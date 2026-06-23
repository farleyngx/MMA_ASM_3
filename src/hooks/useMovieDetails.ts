import { useState, useEffect } from "react";
import { tmdbService } from "../services/tmdb";
import { MovieDetails, Review } from "../types";

export const useMovieDetails = (movieId: string | number) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    if (!movieId) return;
    try {
      setLoading(true);
      setError(null);
      
      const [detailsRes, reviewsRes] = await Promise.all([
        tmdbService.getMovieDetails(movieId),
        tmdbService.getMovieReviews(movieId),
      ]);

      setDetails(detailsRes.data);
      setReviews(reviewsRes.data.results || []);
    } catch (err: any) {
      console.error("Error fetching movie details & reviews:", err);
      setError(err?.message || "Không thể tải chi tiết bộ phim");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [movieId]);

  return { details, reviews, loading, error, refetch: fetchDetails };
};
