import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Loader } from "../../components/common/Loader";
import { FavoriteToggle } from "../../components/movie/FavoriteToggle";
import { ReviewItem } from "../../components/movie/ReviewItem";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { getReleaseYear } from "../../utils/dateFormatter";
import { getImageUrl } from "../../utils/imageBuilder";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { details, reviews, loading, error } = useMovieDetails(id);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center mt-8">
        <Loader message="Đang tải thông tin phim..." />
      </View >
    )
  }

  if (error || !details) {
    return (
      <View className="flex-1 justify-center items-center bg-netflix-black p-6">
        <Text className="text-white text-2xl text-center">{error || "Không tìm thấy thông tin phim"}</Text>
        <TouchableOpacity onPress={() => router.back()} className="bg-netflix-red px-6 py-2 rounded-full mt-4">
          <Text className="text-white font-bold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const backdropUrl = getImageUrl(details.backdrop_path, true);
  const releaseYear = getReleaseYear(details.release_date);

  const ratingOutOfFive = details.vote_average / 2;
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(ratingOutOfFive);
    const hasHalfStar = ratingOutOfFive % 1 >= 0.25 && ratingOutOfFive % 1 < 0.75;
    const roundedStars = ratingOutOfFive % 1 >= 0.75 ? fullStars + 1 : fullStars;

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedStars) {
        stars.push(
          <Ionicons key={i} name="star" size={24} color="#F5C518" style={{ marginRight: 1 }} />
        );
      } else if (i === roundedStars + 1 && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={24} color="#F5C518" style={{ marginRight: 1 }} />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star" size={24} color="#CCCCCC" style={{ marginRight: 1 }} />
        );
      }
    }
    return stars;
  };

  return (
    <ScrollView className="flex-1 bg-netflix-black" showsVerticalScrollIndicator={false}>
      {/* Backdrop Section */}
      <View className="w-full h-[400px] relative">
        <Image source={{ uri: backdropUrl }} className="w-full h-full" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/20" />
      </View>

      {/* Movie Info Section */}
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-white text-4xl font-bold mt-2">{details.title}</Text>
            {details.tagline ? <Text className="text-gray-400 text-xl italic mt-1">&ldquo;{details.tagline}&ldquo;</Text> : null}

          </View>
          <FavoriteToggle movieId={details.id} size={28} />
        </View>

        {/* Metadata row */}
        <View className="flex-row items-center my-2">
          <Text className="text-gray-400 text-xl">{releaseYear}</Text>
          <Text className="text-gray-600 mx-2">|</Text>
          <Text className="text-gray-400 text-xl">{details.runtime} phút</Text>
        </View>

        <View className="flex-row items-center mb-2 ">
          {renderStars()}
          <Text className="text-[#edc001] font-black text-xl ml-2">{details.vote_average.toFixed(1)}</Text>
        </View>

        {/* Genres */}
        <View className="flex-row flex-wrap mb-5 gap-2">
          {details.genres.map((genre) => (
            <View key={genre.id} className="bg-[#262626] px-3 py-1.5 rounded-full">
              <Text className="text-gray-300 text-md italic">{genre.name}</Text>
            </View>
          ))}
        </View>

        {/* Overview */}
        <View className="mb-6">
          <Text className="text-white text-xl font-bold mb-3">Mô tả</Text>
          <Text className="text-gray-300 text-md italic leading-5">{details.overview || "Không có mô tả cho bộ phim này."}</Text>
        </View>

        {/* Reviews Section */}
        <View className="mb-6">
          <Text className="text-white text-xl font-bold mb-3">Đánh giá ({reviews.length})</Text>
          {reviews.length === 0 ? (
            <Text className="text-gray-500 text-md italic">Chưa có đánh giá nào cho bộ phim này.</Text>
          ) : (
            reviews.map((review) => <ReviewItem key={review.id} review={review} />)
          )}
        </View>
      </View>
    </ScrollView>
  );
}
