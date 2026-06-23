# 📋 Movie App - Nhật ký Trạng thái Phát triển (DEVELOPMENT_STATE.md)

Tài liệu này lưu trữ trạng thái hiện tại của dự án, các phần đã làm được, cấu trúc hệ thống và các bước tiếp theo để phục vụ cho các phiên làm việc sau.

---

## 📅 Phiên làm việc: 21-06-2026

### 1. Trạng thái Hiện tại (Current State)
Dự án đã được thiết lập cấu trúc thư mục hoàn tất theo **Functional-Design Pattern** mô phỏng giao diện Netflix Mobile và đã được **refactor 100% sang sử dụng thuần Tailwind CSS (NativeWind v4)**. Toàn bộ các khối `StyleSheet.create` cũ đã được loại bỏ để đảm bảo tính đồng bộ, sạch sẽ và hiện đại của mã nguồn.

#### Thư viện đã cài đặt (Dependencies):
- **Core:** Expo SDK 54.0.34, React Native 0.81.5, React 19.1.0, TypeScript 5.9.2.
- **Routing:** Expo Router v6.0.23 (tọa lạc tại `src/app`).
- **Styling:** NativeWind (v4), Tailwind CSS v3.4.17, PostCSS.
- **Network Layer:** Axios (Giao tiếp với TMDB API).
- **Local Storage:** `@react-native-async-storage/async-storage` (Lưu trữ phim yêu thích).
- **UI FX:** `expo-linear-gradient` (Hiệu ứng gradient đen mờ cho Hero Banner trang chủ).

---

### 2. Cấu trúc thư mục dự án (Project Directory Tree)
```text
.
├── .env                              # Cấu hình biến môi trường API
├── tailwind.config.js                # Cấu hình màu sắc chuẩn Netflix
├── metro.config.js                   # Cấu hình Metro bundler cho NativeWind
├── babel.config.js                   # Cấu hình Babel compiler cho NativeWind
├── global.css                        # Tệp CSS nạp Tailwind directives
├── nativewind-env.d.ts               # Định nghĩa kiểu cho NativeWind
├── package.json                      # Các dependencies và script chạy
├── tsconfig.json                     # Path alias @/* -> ./src/*
├── eslint.config.js                  # Linter rules
├── app.json                          # Cấu hình Expo
├── markdowns/
│   ├── STRUCTURE.md                  # Tài liệu cấu hình thiết kế gốc
│   └── DEVELOPMENT_STATE.md          # Nhật ký tiến độ dự án
└── src/
    ├── app/                          # Định tuyến và Navigation (Expo Router)
    │   ├── _layout.tsx               # Root Layout thiết lập DarkTheme
    │   ├── (tabs)/                   # Bottom tabs navigation
    │   │   ├── _layout.tsx           # Tab bar icons (Trang chủ & Yêu thích)
    │   │   ├── index.tsx             # Home Screen (Banner, Trending lists)
    │   │   └── favorites.tsx         # Favorites Screen (Saved movies grid)
    │   ├── search.tsx                # Search Screen (Input debounced)
    │   └── movie/
    │       └── [id].tsx              # Movie Details Screen (Chi tiết & Reviews)
    ├── components/                   # UI Layer
    │   ├── common/                   # Reusable components
    │   │   ├── Button.tsx
    │   │   ├── Loader.tsx
    │   │   └── SearchBar.tsx
    │   └── movie/                    # Movie specific components
    │       ├── FavoriteToggle.tsx    # Nút thả tim lưu AsyncStorage
    │       ├── HeroBanner.tsx        # Banner phim lớn có linear gradient
    │       ├── HorizontalList.tsx    # List phim cuộn ngang
    │       ├── MovieCard.tsx         # Card phim tỉ lệ dọc
    │       └── ReviewItem.tsx        # Card hiển thị review của user
    ├── hooks/                        # Logic Layer (Custom hooks)
    │   ├── useFavorites.tsx          # Logic Get/Set/Toggle mảng Favorite IDs
    │   ├── useMovieDetails.ts        # Tải chi tiết & Reviews của phim
    │   ├── useSearch.ts              # Tìm kiếm phim theo từ khóa
    │   └── useTrending.ts            # Tải danh sách phim thịnh hành
    ├── services/                     # Network Layer (Giao tiếp API)
    │   ├── apiClient.ts              # Axios instance chung
    │   └── tmdb.ts                   # Gọi các endpoints cụ thể của TMDB
    ├── utils/                        # Helper Layer
    │   ├── dateFormatter.ts          # Định dạng ngày, năm
    │   └── imageBuilder.ts           # Xây dựng URL đầy đủ cho poster/backdrop
    └── types/                        # Type Layer (TypeScript interfaces)
        └── index.ts                  # Định nghĩa types của API & Entity
```

---

### 3. Chi tiết các Tệp tin Đã tạo (Files Created)

#### 📂 Cấu hình Dự án (Root Configs):
- [`.env`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/.env): Chứa các biến môi trường cấu hình TMDB API.
- [`tailwind.config.js`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/tailwind.config.js): Cấu hình bảng màu chuẩn Netflix (`netflix-black`, `netflix-red`, v.v.).
- [`metro.config.js`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/metro.config.js): Cấu hình Metro Bundler tích hợp compiler NativeWind.
- [`babel.config.js`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/babel.config.js): Cấu hình babel preset hỗ trợ nativewind compiler.
- [`global.css`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/global.css): Chứa các directives `@tailwind` nạp Tailwind utility classes.
- [`nativewind-env.d.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/nativewind-env.d.ts): Định nghĩa kiểu TypeScript cho NativeWind.
- [`tsconfig.json`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/tsconfig.json): Đã cập nhật path alias `@/*` trỏ tới `./src/*`.

#### 📂 Cấu trúc mã nguồn `/src`:
1. **Navigation & Screens (`src/app/`):**
   - [`_layout.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/_layout.tsx): Thiết lập Root Stack, áp dụng Dark Theme toàn bộ các màn hình và nạp `global.css`.
   - [`(tabs)/_layout.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/\(tabs\)/_layout.tsx): Cấu hình tab navigation (Trang chủ & Yêu thích).
   - [`(tabs)/index.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/\(tabs\)/index.tsx): Màn hình Trang chủ với logo NETFLIX, nút Tìm kiếm, HeroBanner và các danh sách phim thịnh hành.
   - [`(tabs)/favorites.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/\(tabs\)/favorites.tsx): Màn hình danh sách phim đã lưu, hiển thị dạng Grid 3 cột.
   - [`search.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/search.tsx): Màn hình Tìm kiếm với input gõ từ khóa hỗ trợ debounced.
   - [`movie/[id].tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/movie/\[id\].tsx): Màn hình Chi tiết phim chứa Backdrop banner rộng, điểm số IMDb, mô tả phim và danh sách các đánh giá.

2. **UI Components (`src/components/`):**
   - **common/**
     - [`Button.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/common/Button.tsx): Nút bấm tùy biến (Primary/Secondary/Outline).
     - [`Loader.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/common/Loader.tsx): Màn hình chờ với spinner màu đỏ.
     - [`SearchBar.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/common/SearchBar.tsx): Thanh tìm kiếm tích hợp icon và nút xóa nhanh text.
   - **movie/**
     - [`FavoriteToggle.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/FavoriteToggle.tsx): Nút thả tim giúp thêm/xóa phim khỏi AsyncStorage.
     - [`HeroBanner.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/HeroBanner.tsx): Banner phim lớn ở đầu trang kèm overlay gradient mờ và nút CTA.
     - [`HorizontalList.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/HorizontalList.tsx): Danh sách phim cuộn ngang.
     - [`MovieCard.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/MovieCard.tsx): Card phim tỷ lệ dọc (tên phim, ảnh bìa, rating và năm).
     - [`ReviewItem.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/ReviewItem.tsx): Hiển thị từng bình luận của user, hỗ trợ xem thêm/thu gọn.

3. **Hooks & Logic (`src/hooks/`):**
   - [`useFavorites.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/hooks/useFavorites.tsx): Quản lý danh sách ID phim yêu thích lưu trong local storage.
   - [`useMovieDetails.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/hooks/useMovieDetails.ts): Fetch gộp chi tiết phim và reviews từ API.
   - [`useSearch.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/hooks/useSearch.ts): Gọi API tìm kiếm theo từ khóa.
   - [`useTrending.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/hooks/useTrending.ts): Tải danh sách phim thịnh hành.

4. **API Services (`src/services/`):**
   - [`apiClient.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/services/apiClient.ts): Định nghĩa Axios instance gắn tham số API Key mặc định.
   - [`tmdb.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/services/tmdb.ts): Các endpoints giao tiếp cụ thể (trending, search, details, reviews).

5. **Utilities & Helpers (`src/utils/`):**
   - [`dateFormatter.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/utils/dateFormatter.ts): Format ngày sang định dạng Việt Nam, trích xuất năm phát hành.
   - [`imageBuilder.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/utils/imageBuilder.ts): Ghép API Base URL để lấy link ảnh đầy đủ (w500 và original).

6. **TypeScript Types (`src/types/`):**
   - [`index.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/types/index.ts): Định nghĩa các interfaces `Movie`, `MovieDetails`, `Review`, `TMDBResponse`.

---

### 3. Kế hoạch Phiên Tiếp theo (Next Steps / Tasks)

- [x] **Đồng bộ hóa phiên bản Babel Preset:** Hạ cấp `babel-preset-expo` trong `package.json` về đúng `"~54.0.11"` để tương thích hoàn toàn với Expo SDK 54 (khắc phục xung đột do phiên bản v56 cài sai trước đó).
- [x] **Khôi phục tệp babel.config.js sạch sẽ:** Đưa cấu hình Babel về dạng tối giản chứa `babel-preset-expo` và `nativewind/babel`, gỡ bỏ các plugin thủ công dư thừa.
- [ ] **Nhập API Key TMDB:** Cập nhật khóa API thực vào biến `EXPO_PUBLIC_TMDB_API_KEY` trong file [`.env`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/.env).
- [ ] **Khởi động & Chạy thử:** Chạy lệnh `npx expo start --clear` trên máy thật/mô phỏng để kiểm tra hoạt động ứng dụng.
- [ ] **Xử lý Biên Ngoại lệ (Error Handling):** Bổ sung các thông báo mạng khi mất kết nối hoặc khi không lấy được API Key (ví dụ: hiển thị cảnh báo nếu API Key vẫn để mặc định).
- [x] **Tinh chỉnh Giao diện:** Thiết kế lại chi tiết màu sắc, khoảng cách padding của từng card phim để đạt chuẩn visual Netflix cao nhất. Đã cập nhật thanh đánh giá 5 sao trong [id].tsx sử dụng Ionicons (nền trắng, sao vàng/xám) đồng bộ theo tham chiếu star-rating.png.
- [x] **Cập nhật Reactive Favorites Screen:** Triển khai `FavoritesProvider` sử dụng React Context ở `_layout.tsx` để đồng bộ hóa danh sách phim yêu thích tức thời khi thêm/xóa ở màn hình chi tiết, giảm số lượng đọc ghi AsyncStorage không cần thiết.
- [x] **Tránh Bàn Phím Trang Tìm Kiếm:** Bọc giao diện màn hình search trong `KeyboardAvoidingView` để tránh che khuất nội dung, hỗ trợ tắt bàn phím khi vuốt (`keyboardDismissMode="on-drag"`) và cho phép click chọn trực tiếp phim (`keyboardShouldPersistTaps="handled"`).
- [x] **Cấu trúc tải phân trang cuộn vô hạn (Stable Infinite Scroll):** Tái cấu trúc hook `useSearch` và `useTrending` sử dụng `useRef` cho các biến kiểm soát trang để giữ tham chiếu callback tĩnh (`useCallback` rỗng), khắc phục triệt để lỗi gọi API lặp vô hạn trước đó và hỗ trợ cuộn dọc tự động tải trang mới mượt mà tại cả màn hình Tìm kiếm (`search.tsx`) và màn hình Thịnh hành (`trending.tsx`).
- [x] **Trực quan hóa Loading bằng Skeleton:** Tăng thời gian debounce của hộp tìm kiếm lên `800` ms để tránh spam API, thiết lập component `MovieCardSkeleton` tạo hiệu ứng nhấp nháy (Animated opacity) hiển thị dạng lưới tải 3 cột tại màn hình Tìm kiếm (`search.tsx`) và màn hình Thịnh hành (`trending.tsx`) cực kỳ mượt mà chuẩn Netflix.
