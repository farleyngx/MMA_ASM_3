import { apiClient } from "./apiClient";

export const tmdbService = {
  // Lấy phim Trending cho Home Screen
  getTrendingMovies: (page = 1) => apiClient.get("/trending/movie/week", { params: { page } }),

  // Tìm kiếm phim động theo từ khóa
  searchMovies: (query: string, page = 1) =>
    apiClient.get("/search/movie", { params: { query, page } }),

  // Chi tiết phim (Kèm vote_average, overview)
  getMovieDetails: (id: string | number) => apiClient.get(`/movie/${id}`),

  // Đánh giá của người dùng
  getMovieReviews: (id: string | number) =>
    apiClient.get(`/movie/${id}/reviews`),
};
