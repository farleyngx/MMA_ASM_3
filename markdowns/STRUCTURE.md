# 🎬 Movie App (Netflix UI Style) - Project Specification & Architecture

Tài liệu này đặc tả cấu trúc mã nguồn, cấu hình môi trường và các thành phần cốt lõi để tự động hóa việc khởi tạo (scaffold) dự án Movie App. Kiến trúc sử dụng **Functional-Design Pattern**, tối ưu cho ứng dụng quy mô nhỏ với UI phong cách Netflix (Dark theme, Hero banner, Horizontal scroll).

---

## 🛠️ Tech Stack & Core Libraries

- **Framework:** React Native / Expo (sử dụng **Expo Router** cho Navigation).
- **Styling:** Tailwind CSS (NativeWind v4) - Mặc định Dark Mode (`#000000` hoặc `#141414` chuẩn Netflix).
- **Network Layer:** Axios (Giao tiếp với TMDB API).
- **Local Storage:** `@react-native-async-storage/async-storage` (Quản lý mảng Favorite Movie IDs).
- **Architecture Pattern:** Functional / Layered Architecture.

---

## 📂 Complete Directory Tree Structure

```text
.
├── .env                              # Khai báo biến môi trường API
├── tailwind.config.js                # Cấu hình màu sắc chuẩn Netflix
├── package.json
└── src
    ├── app                           # (Navigation Layer) Cấu trúc Expo Router
    │   ├── _layout.tsx               # Root Stack, cấu hình màu nền đen toàn cục
    │   ├── (tabs)                    # Bottom Navigation Tabs
    │   │   ├── _layout.tsx
    │   │   ├── index.tsx             # Home Screen (Trending Movies)
    │   │   └── favorites.tsx         # Favorite Screen (Danh sách phim đã lưu)
    │   ├── search.tsx                # Màn hình Tìm kiếm (Push screen)
    │   └── movie                     # Màn hình Chi tiết Phim
    │       └── [id].tsx              # Dynamic route nhận movie_id
    │
    ├── components                    # (UI Layer) Chứa toàn bộ các khối giao diện
    │   ├── common                    # UI dùng chung
    │   │   ├── Button.tsx
    │   │   ├── Loader.tsx
    │   │   └── SearchBar.tsx
    │   └── movie                     # UI đặc thù cho phim
    │       ├── HeroBanner.tsx        # Poster lớn nổi bật trên cùng ở Home (Netflix style)
    │       ├── MovieCard.tsx         # Thẻ phim dọc (Poster, Tên, Năm)
    │       ├── HorizontalList.tsx    # Danh sách cuộn ngang
    │       ├── FavoriteToggle.tsx    # Nút thả tim (Tương tác với AsyncStorage)
    │       └── ReviewItem.tsx        # Card hiển thị 1 đánh giá của user
    │
    ├── hooks                         # (Logic Layer) Custom Hooks xử lý nghiệp vụ
    │   ├── useTrending.ts            # Fetch danh sách phim thịnh hành
    │   ├── useSearch.ts              # Fetch phim theo từ khóa
    │   ├── useMovieDetails.ts        # Lấy thông tin chi tiết & Reviews
    │   └── useFavorites.tsx          # Logic Get/Set/Toggle mảng ID từ AsyncStorage
    │
    ├── services                      # (Network Layer) Giao tiếp API
    │   ├── apiClient.ts              # Cấu hình Axios Instance chung
    │   └── tmdb.ts                   # Định nghĩa các hàm gọi endpoint cụ thể
    │
    ├── utils                         # (Helper Layer) Các hàm hỗ trợ
    │   ├── imageBuilder.ts           # Hàm ghép base_url với poster_path
    │   └── dateFormatter.ts          # Format "YYYY-MM-DD" thành năm
    │
    └── types                         # (Type Layer) TypeScript Interfaces
        └── index.ts

```

---

⚙️ 1. Environment & API Configurations
File: .env

```bash
EXPO_PUBLIC_TMDB_API_URL=[https://api.themoviedb.org/3](https://api.themoviedb.org/3)
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
EXPO_PUBLIC_TMDB_IMAGE_BASE=[https://image.tmdb.org/t/p/w500](https://image.tmdb.org/t/p/w500)
EXPO_PUBLIC_TMDB_IMAGE_ORIGINAL=[https://image.tmdb.org/t/p/original](https://image.tmdb.org/t/p/original)
```

File: src/services/apiClient.ts
Khởi tạo cấu hình mạng mặc định, tự động gắn API Key vào mọi request.

```tsx
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_TMDB_API_URL,
  timeout: 10000,
  params: {
    api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    language: "vi-VN",
  },
});
```

---

🔗 2. TMDB API Endpoints Mapping (src/services/tmdb.ts)
Tất cả các endpoint đã được tinh chỉnh chính xác cho ứng dụng Movie thay vì cấu trúc All/Collection:

```tsx
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
```

---

💾 3. State Management: Favorite Logic (src/hooks/useFavorites.ts)
Triển khai lưu trữ mảng ID tối ưu dung lượng bằng AsyncStorage.

```tsx
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_KEY = "@movie_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load danh sách ID khi khởi động
  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem(FAVORITE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    };
    loadFavorites();
  }, []);

  // Xử lý Thêm / Xóa khỏi danh sách
  const toggleFavorite = async (movieId: number) => {
    let updatedFavorites = [...favorites];

    if (updatedFavorites.includes(movieId)) {
      updatedFavorites = updatedFavorites.filter((id) => id !== movieId); // Xóa nếu đã có
    } else {
      updatedFavorites.push(movieId); // Thêm nếu chưa có
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movieId: number) => favorites.includes(movieId);

  return { favorites, toggleFavorite, isFavorite };
};
```

---

🎨 4. Gợi ý UI Phong cách Netflix (NativeWind)

- Màu nền: Bọc root layout bằng bg-[#141414] (màu nền đặc trưng của Netflix).

- Typography: Sử dụng màu trắng text-white cho tiêu đề và xám text-gray-400 cho mô tả/năm phát hành.

- Hero Banner (src/components/movie/HeroBanner.tsx):
  Sử dụng poster định dạng dọc lớn ở Home. Áp dụng hiệu ứng Linear Gradient mờ dần từ dưới lên để phần chữ (Title) nổi bật trên nền hình ảnh.

- Movie Card (src/components/movie/MovieCard.tsx):
  Layout dọc gồm: Image Cover (tỷ lệ 2:3, border-radius nhỏ rounded-md) -> Title (chỉ hiển thị 1 dòng numberOfLines={1}) -> Release Year & Tích hợp icon Favorite góc phải.

- Trang Chi tiết (src/app/movie/[id].tsx):
  Ảnh nền rộng trên cùng (dùng backdrop_path kết hợp endpoint TMDB_IMAGE_ORIGINAL) -> Nhóm tiêu đề & Nút Play (Trailer) / Nút Add to List -> Overview text -> Khu vực FlatList các Reviews.
