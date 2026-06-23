import { apiClient } from "./apiClient";

export const tmdbService = {
  // Lấy phim Trending cho Home Screen
  getTrendingMovies: () => apiClient.get("/trending/movie/week"),

  // Tìm kiếm phim động theo từ khóa
  searchMovies: (query: string) =>
    apiClient.get("/search/movie", { params: { query } }),

  // Chi tiết phim (Kèm vote_average, overview)
  getMovieDetails: (id: string | number) => apiClient.get(`/movie/${id}`),

  // Đánh giá của người dùng
  getMovieReviews: (id: string | number) =>
    apiClient.get(`/movie/${id}/reviews`),
};
