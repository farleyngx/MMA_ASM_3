# 🎬 Báo Cáo Phân Tích & Đánh Giá Mã Nguồn Dự Án Movie App (Netflix Style)

Báo cáo này cung cấp thông tin chi tiết về việc bóc tách toàn bộ mã nguồn, cập nhật tiến trình phát triển và cấu trúc thư mục hiện tại, đồng thời đưa ra đánh giá kỹ thuật toàn diện dựa trên mã nguồn thực tế của dự án **Asm3_SE191034_MovieApp**.

---

## 📂 1. Cấu Trúc Dự Án Thực Tế (Project Structure)
*(Được đối chiếu và chuẩn hóa theo [STRUCTURE.md](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/markdowns/STRUCTURE.md))*

Dự án tuân thủ theo **Functional-Design Pattern** phân chia mã nguồn rõ ràng theo các tầng chức năng.

```text
D:\FPT\SU26\MMA301\Projects\Asm3_SE191034_MovieApp
├── .env                              # Khai báo các API endpoints & keys cho TMDB
├── tailwind.config.js                # Cấu hình Tailwind/NativeWind và bảng màu chuẩn Netflix
├── metro.config.js                   # Cấu hình Metro bundler tích hợp NativeWind
├── babel.config.js                   # Cấu hình Babel preset (expo-router và nativewind)
├── global.css                        # Tệp CSS nạp Tailwind directives toàn cục
├── nativewind-env.d.ts               # Khai báo kiểu TypeScript cho NativeWind
├── package.json                      # Quản lý dependencies (Expo SDK 54) và scripts
├── tsconfig.json                     # Cấu hình TypeScript và Alias (@/* -> ./src/*)
├── eslint.config.js                  # Quy tắc kiểm lỗi linter
├── app.json                          # Cấu hình ứng dụng Expo
├── markdowns/
│   ├── STRUCTURE.md                  # Tài liệu cấu trúc & thiết kế gốc
│   └── DEVELOPMENT_STATE.md          # Nhật ký tiến trình phát triển
└── src/
    ├── app/                          # Tầng điều hướng (Navigation) dựa trên Expo Router
    │   ├── _layout.tsx               # Root Layout, bọc ThemeProvider (Dark) & Stack Router
    │   ├── (tabs)/                   # Nhóm màn hình có Bottom Tab Bar
    │   │   ├── _layout.tsx           # Cấu hình Tab Bar & Icons (Trang chủ / Yêu thích)
    │   │   ├── index.tsx             # Màn hình chính (Logo, HeroBanner, Trending & Recommendations)
    │   │   └── favorites.tsx         # Màn hình lưu trữ phim yêu thích (Grid 3 cột)
    │   ├── search.tsx                # Màn hình tìm kiếm phim (Debounced search input)
    │   └── movie/
    │       └── [id].tsx              # Màn hình chi tiết phim động (Movie Details & Reviews)
    ├── components/                   # Tầng giao diện người dùng (UI Components)
    │   ├── common/                   # Các thành phần dùng chung (Reusable UI)
    │   │   ├── Button.tsx            # Nút nhấn đa năng (Primary, Secondary, Outline)
    │   │   ├── Loader.tsx            # Chỉ báo tải trang (Spinner đỏ Netflix)
    │   │   └── SearchBar.tsx         # Thanh nhập liệu tìm kiếm tích hợp icon xóa nhanh
    │   └── movie/                    # Các thành phần đặc thù của phim
    │       ├── FavoriteToggle.tsx    # Nút thả tim yêu thích (Lưu vào AsyncStorage)
    │       ├── HeroBanner.tsx        # Banner phim nổi bật với dải màu Gradient chuyển tiếp
    │       ├── HorizontalList.tsx    # Danh sách phim trượt ngang (FlatList)
    │       ├── MovieCard.tsx         # Card phim tỷ lệ dọc (Ảnh, tiêu đề, năm, điểm)
    │       └── ReviewItem.tsx        # Card bình luận người dùng (Thu gọn/Xem thêm)
    ├── hooks/                        # Tầng xử lý logic nghiệp vụ (Custom Hooks)
    │   ├── useFavorites.ts           # Quản lý trạng thái & IO AsyncStorage cho phim yêu thích
    │   ├── useMovieDetails.ts        # Gọi gộp API chi tiết và đánh giá (Reviews) của phim
    │   ├── useSearch.ts              # Xử lý gọi API tìm kiếm phim theo từ khóa
    │   └── useTrending.ts            # Tải danh sách phim thịnh hành hàng tuần
    ├── services/                     # Tầng kết nối mạng (API Client & Services)
    │   ├── apiClient.ts              # Cấu hình Axios instance mặc định
    │   └── tmdb.ts                   # Định nghĩa các endpoints TMDB API
    ├── utils/                        # Tầng tiện ích hỗ trợ (Helpers)
    │   ├── dateFormatter.ts          # Định dạng ngày tháng & trích xuất năm phát hành
    │   └── imageBuilder.ts           # Xây dựng URL đầy đủ cho ảnh poster/backdrop
    └── types/                        # Tầng khai báo kiểu dữ liệu (TypeScript Types)
        └── index.ts                  # Định nghĩa các Interfaces cho thực thể dữ liệu
```

---

## 📈 2. Tiến Trình Phát Triển Hiện Tại (Development State)
*(Đối chiếu theo [DEVELOPMENT_STATE.md](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/markdowns/DEVELOPMENT_STATE.md))*

### ✅ Các hạng mục đã hoàn tất:
1. **Thiết lập hạ tầng (Root Infrastructure):**
   - Đã cấu hình thành công NativeWind v4 hoạt động đồng bộ với Tailwind CSS v3 trong dự án React Native (Expo SDK 54).
   - Đã sửa lỗi phiên bản `babel-preset-expo` về đúng `"~54.0.11"` và tối giản hóa tệp `babel.config.js`.
   - Thiết lập path alias `@/*` hoạt động chuẩn xác trong `tsconfig.json`.
2. **Triển khai toàn bộ màn hình:**
   - [x] **Trang chủ:** Hero banner phim hot nhất kèm mô tả ngắn, hai danh sách cuộn ngang ("Phim đang thịnh hành", "Gợi ý dành cho bạn").
   - [x] **Trang chi tiết phim:** Backdrop kích thước lớn, tiêu đề phim kèm taglines, thông số thời lượng/rating/năm, danh sách thể loại phim (Genres), phần mô tả và danh sách đánh giá của người dùng.
   - [x] **Trang tìm kiếm:** Hộp tìm kiếm debounce 500ms giúp giảm tải số lượng request liên tục lên API TMDB, hiển thị kết quả dạng lưới 3 cột.
   - [x] **Trang yêu thích:** Tự động lấy danh sách phim yêu thích từ AsyncStorage và tải thông tin chi tiết của chúng song song, hiển thị dạng lưới.
3. **Cơ chế lưu trữ:**
   - Hoàn thành tính năng Lưu/Bỏ lưu phim (Favorite) bằng bộ nhớ cục bộ `AsyncStorage`.

### ⏳ Các hạng mục cần cải tiến & xử lý:
* **Nhập API Key TMDB:** Hiện tại tệp `.env` đã có khóa API hoạt động, cần đảm bảo tệp này không bị đẩy lên repo Git công khai (`.gitignore` đã cấu hình chặn `.env`).
* **Khởi động và kiểm thử:** Tiến hành chạy `npx expo start --clear` để xóa cache và kiểm tra độ mượt trên thiết bị mô phỏng hoặc máy thật.
* **Xử lý lỗi mạng và ngoại lệ:** Cần bổ sung giao diện hiển thị khi mất kết nối Internet hoặc lỗi API TMDB thay vì chỉ hiển thị thông báo text thô sơ.

---

## 🔍 3. Bóc Tách Chi Tiết Mã Nguồn (Code Deconstruction)

### A. Tầng Điều Hướng & Màn Hình (Navigation & Screens)
* **[`src/app/_layout.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/_layout.tsx):** 
  - Khai báo một hằng số theme tùy chỉnh `NetflixTheme` ghi đè `DarkTheme` của `@react-navigation/native` để đổi màu nền toàn ứng dụng thành màu đen đặc trưng của Netflix (`#141414`) và màu chủ đạo thành màu đỏ thương hiệu (`#E50914`).
  - Sử dụng `<Stack>` router để thiết lập định tuyến đa màn hình, vô hiệu hóa header của bottom tabs, thiết lập tiêu đề tiếng Việt cho các trang con.
* **[`src/app/(tabs)/_layout.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/%28tabs%29/_layout.tsx):** 
  - Cấu hình Bottom Tab Bar chứa 2 tab: "Trang chủ" (Home) và "Yêu thích" (Favorites).
  - Sử dụng icon của thư viện `@expo/vector-icons/Ionicons` tự động thay đổi trạng thái icon từ rỗng (outline) sang đặc (focused) dựa trên tab đang hoạt động.
* **[`src/app/(tabs)/index.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/%28tabs%29/index.tsx):** 
  - Sử dụng custom hook `useTrending` để lấy danh sách phim hot trong tuần.
  - Phân tách phim đầu tiên làm phim đại diện cho phần `HeroBanner`, sau đó chia danh sách phim thành 2 phần: top 10 phim thịnh hành và top 10 phim tiếp theo cho danh sách khuyến nghị.
* **[`src/app/search.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/search.tsx):**
  - Quản lý trạng thái chuỗi tìm kiếm đầu vào (`query`).
  - Triển khai kỹ thuật **Debounce** bằng `useEffect` với thời gian chờ 500ms. Mỗi khi ký tự nhập thay đổi, timer cũ bị hủy qua hàm dọn dẹp `clearTimeout` giúp tối ưu hóa băng thông mạng.
* **[`src/app/movie/[id].tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/movie/%5Bid%5D.tsx):**
  - Màn hình động sử dụng `useLocalSearchParams` của Expo Router để trích xuất `id` của phim.
  - Hiển thị đầy đủ thông tin chi tiết phim bao gồm: ảnh nền backdrop mờ, tiêu đề, tag line, nút yêu thích, thời lượng phim, điểm đánh giá trung bình, danh sách thể loại phim (Genres), nội dung mô tả (Overview) và phần bình luận.
* **[`src/app/(tabs)/favorites.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/app/%28tabs%29/favorites.tsx):**
  - Theo dõi danh sách ID yêu thích từ AsyncStorage.
  - Tải thông tin chi tiết của nhiều phim cùng lúc bằng cách dùng `Promise.all` tạo danh sách các request Axios song song, tăng tốc độ phản hồi đáng kể.

### B. Tầng Thành Phần Giao Diện (UI Components)
* **[`src/components/common/Button.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/common/Button.tsx):**
  - Triển khai nút bấm đa cấu hình nhận thuộc tính `variant` (`primary` màu đỏ, `secondary` màu trắng, `outline` viền xám nền trong suốt).
  - Có cơ chế vô hiệu hóa (`disabled`) mờ nút bấm và hỗ trợ gộp thuộc tính `className` tùy biến bổ sung từ component cha.
* **[`src/components/movie/HeroBanner.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/HeroBanner.tsx):**
  - Banner chính trang chủ sử dụng `ImageBackground` hiển thị ảnh poster chất lượng gốc (`original`).
  - Áp dụng `LinearGradient` từ thư viện `expo-linear-gradient` phủ màu từ trong suốt sang màu đen `#141414` ở chân ảnh giúp nội dung văn bản nổi rõ và tạo hiệu ứng chìm mượt mà vào giao diện tối.
* **[`src/components/movie/MovieCard.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/MovieCard.tsx):**
  - Thể hiện thẻ phim dọc cỡ nhỏ. Để tránh việc NativeWind làm biến dạng ảnh trên các nền tảng khác nhau, mã nguồn đã ấn định cứng kích thước Image thông qua thuộc tính `style={{ width: 110, height: 160 }}` song song với class Tailwind.
* **[`src/components/movie/FavoriteToggle.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/FavoriteToggle.tsx):**
  - Component độc lập xử lý trạng thái lưu phim yêu thích. Tự động hiển thị `ActivityIndicator` màu đỏ khi đang truy vấn AsyncStorage và thay đổi icon tim màu đỏ (đầy) hoặc trắng (rỗng).
* **[`src/components/movie/ReviewItem.tsx`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/components/movie/ReviewItem.tsx):**
  - Hiển thị thông tin bình luận, lấy chữ cái đầu của tên tác giả làm avatar tròn đỏ.
  - Thiết lập thuộc tính `numberOfLines` động. Nếu bình luận dài hơn 200 ký tự sẽ có nút bấm "Xem thêm" / "Thu gọn" để người dùng mở rộng đọc tại chỗ.

### C. Tầng Nghiệp Vụ & Kết Nối (Hooks & Services)
* **[`src/hooks/useFavorites.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/hooks/useFavorites.ts):**
  - Đóng gói toàn bộ logic truy xuất và cập nhật AsyncStorage với key `@movie_favorites`.
  - Trả ra hàm `toggleFavorite(movieId)` để thêm/bớt phim và kiểm tra trạng thái nhanh bằng `isFavorite(movieId)`.
* **[`src/hooks/useMovieDetails.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/hooks/useMovieDetails.ts):**
  - Sử dụng cơ chế gộp bất đồng bộ `Promise.all` để fetch song song hai endpoint: lấy chi tiết bộ phim và lấy danh sách các review của phim đó.
* **[`src/services/apiClient.ts`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/src/services/apiClient.ts):**
  - Khởi tạo đối tượng `axios.create` có `baseURL` và thời gian timeout là 10 giây.
  - Tự động đính kèm `api_key` lấy từ biến môi trường của hệ thống Expo và thiết lập ngôn ngữ mặc định là `vi-VN` cho mọi request.

---

## 📈 4. Đánh Giá Toàn Diện Mã Nguồn (Technical Evaluation)

Sau khi kiểm thử và đọc hiểu toàn bộ tệp tin nguồn trong dự án, dưới đây là các nhận xét, đánh giá sâu sắc về mặt kiến trúc và đề xuất tối ưu:

### 👍 Ưu điểm (Strengths)
1. **Phân Tách Rõ Ràng (Separation of Concerns):**
   - Dự án phân chia cấu trúc thư mục rất tốt. Logic mạng đặt trong `services`, logic UI React đặt trong `hooks`, các thành phần tái sử dụng đặt trong `components` và giao diện chính đặt trong `app` (Expo Router). Điều này giúp dễ bảo trì và mở rộng sau này.
2. **Sạch Sẽ Về Mặt Styling:**
   - Việc loại bỏ 100% các khối `StyleSheet.create` thủ công và chuyển hoàn toàn sang sử dụng Tailwind CSS (NativeWind v4) giúp cho mã nguồn giao diện gọn nhẹ hơn, thống nhất được bộ màu chuẩn Netflix (`netflix-black`, `netflix-red`, `netflix-gray`).
3. **Tối Ưu Trải Nghiệm & Hiệu Năng Mạng:**
   - **Debouncing:** Áp dụng debounce cho ô tìm kiếm giúp ngăn ngừa việc người dùng gõ phím làm gửi hàng chục request liên tục lên API TMDB.
   - **Parallel Requests:** Sử dụng `Promise.all` khi tải dữ liệu chi tiết phim (Details + Reviews) và khi tải dữ liệu phim yêu thích trong danh sách giúp giảm đáng kể thời gian chờ đợi của người dùng.
4. **TypeScript Chặt Chẽ:**
   - Các thực thể cốt lõi (`Movie`, `MovieDetails`, `Review`, `TMDBResponse<T>`) đều được định nghĩa rõ ràng trong `types/index.ts`, giúp quá trình code nhận diện nhắc lệnh tự động rất tốt và giảm thiểu lỗi runtime.

### ⚠️ Điểm Cần Cải Tiến & Đề Xuất Tối Ưu (Opportunities for Improvement)

#### 1. Sử dụng thư viện `expo-image` thay vì `Image` thông thường từ `react-native`
* **Vấn đề:** Trong `MovieCard.tsx` và `[id].tsx`, dự án đang import thành phần `Image` mặc định từ `react-native`.
* **Phân tích:** Trong `package.json`, dự án đã được cài đặt sẵn thư viện `"expo-image": "~3.0.11"`. Thư viện `expo-image` là một thư viện hiển thị ảnh hiệu năng cực cao dành riêng cho Expo, hỗ trợ:
  - Tự động cache ảnh thông minh dưới local (rất quan trọng với danh sách poster phim tải liên tục).
  - Hỗ trợ ảnh mờ placeholder tạm thời khi đang tải ảnh chính (Blurhash).
  - Hiệu ứng xuất hiện mượt mà (cross-fade transition) tăng tính thẩm mỹ vượt bậc chuẩn Netflix.
* **Đề xuất:** Thay thế `Image` của `react-native` bằng `Image` của `expo-image`.
  ```tsx
  // Thay thế:
  import { Image } from 'react-native';
  // Bằng:
  import { Image } from 'expo-image';
  ```

#### 2. Tối ưu hóa việc gọi AsyncStorage nhiều lần trong `FavoriteToggle`
* **Vấn đề:** Component `FavoriteToggle` được sử dụng ở nhiều nơi (Hero Banner, màn hình Chi tiết Phim). Trong mã nguồn, mỗi khi component `FavoriteToggle` được mount, nó lại gọi custom hook `useFavorites()` độc lập:
  ```tsx
  const { isFavorite, toggleFavorite, loading } = useFavorites();
  ```
* **Phân tích:** Hook `useFavorites` chứa một `useEffect` chạy `AsyncStorage.getItem("@movie_favorites")`. Nếu trên một màn hình hiển thị danh sách dài các phim và mỗi thẻ phim đều gắn `FavoriteToggle` (ở phiên bản mở rộng sau này), ứng dụng sẽ thực hiện hàng loạt truy vấn đọc ổ đĩa độc lập từ bộ nhớ AsyncStorage, gây ảnh hưởng đến hiệu năng (I/O Bottleneck).
* **Đề xuất:** Xây dựng một **React Context** (ví dụ: `FavoritesProvider`) bọc ở file root `src/app/_layout.tsx`. Khi đó, danh sách ID yêu thích chỉ được đọc đúng một lần duy nhất từ AsyncStorage khi mở app và được lưu trữ trong bộ nhớ RAM toàn cục (Global State). Các nút tim `FavoriteToggle` lúc này chỉ việc đọc dữ liệu tức thời từ Context, giúp phản hồi thao tác thả tim ngay lập tức không có độ trễ và loại bỏ việc đọc file trùng lặp.

#### 3. Cải thiện thiết kế UI hiển thị thông tin phim trống & Lỗi kết nối
* **Vấn đề:** Hiện tại ở màn hình chính, nếu lỗi API, ta có nút "Thử lại". Tuy nhiên ở màn hình Yêu thích hoặc Tìm kiếm, khi gặp lỗi chỉ hiển thị một dòng text thông báo đơn giản ở giữa màn hình.
* **Đề xuất:** Thiết kế UI báo lỗi chuyên nghiệp với minh họa nhẹ (illustration) kết hợp nút refresh, tương tự ứng dụng Netflix thực tế khi mất kết nối mạng.

---

## 🛠️ 5. Hướng Dẫn Vận Hành & Chạy Dự Án (Operations Guide)

Để khởi chạy dự án Movie App sau quá trình phân tích mã nguồn này, bạn thực hiện theo các bước sau:

1. **Kiểm tra tệp biến môi trường:**
   Đảm bảo tệp [`.env`](file:///D:/FPT/SU26/MMA301/Projects/Asm3_SE191034_MovieApp/.env) ở thư mục gốc có nội dung chính xác chứa API Key TMDB đã cấu hình ở trên.
2. **Cài đặt thư viện:**
   Mở terminal trong thư mục dự án và chạy lệnh cài đặt để đảm bảo tất cả các dependencies được nạp đủ:
   ```bash
   npm install
   ```
3. **Khởi chạy ứng dụng và xóa cache cũ:**
   Để tránh các lỗi cache về cấu hình Tailwind CSS/NativeWind và định tuyến của Expo Router, khuyên dùng lệnh xóa cache:
   ```bash
   npx expo start --clear
   ```
4. **Trình mô phỏng / Thiết bị thật:**
   - Ấn `a` để chạy trên trình mô phỏng Android.
   - Ấn `i` để chạy trên trình mô phỏng iOS.
   - Quét mã QR hiển thị bằng ứng dụng **Expo Go** trên thiết bị di động thật để chạy thử.
