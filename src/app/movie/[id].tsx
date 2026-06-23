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
    return <Loader message="Đang tải thông tin phim..." />;
  }

  if (error || !details) {
    return (
      <View className="flex-1 justify-center items-center bg-netflix-black p-6">
        <Text className="text-white text-base text-center">{error || "Không tìm thấy thông tin phim"}</Text>
        <TouchableOpacity onPress={() => router.back()} className="bg-netflix-red px-6 py-2 rounded-full mt-4">
          <Text className="text-white font-bold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const backdropUrl = getImageUrl(details.backdrop_path, true);
  const releaseYear = getReleaseYear(details.release_date);

  return (
    <ScrollView className="flex-1 bg-netflix-black" showsVerticalScrollIndicator={false}>
      {/* Backdrop Section */}
      <View className="w-full h-[240px] relative">
        <Image source={{ uri: backdropUrl }} className="w-full h-full" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/40" />
      </View>

      {/* Movie Info Section */}
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">{details.title}</Text>
            {details.tagline ? <Text className="text-gray-400 text-sm italic mt-1">&ldquo;{details.tagline}&ldquo;</Text> : null}
          </View>
          <View className="ml-3">
            <FavoriteToggle movieId={details.id} size={28} />
          </View>
        </View>

        {/* Metadata row */}
        <View className="flex-row items-center mb-4">
          <Text className="text-gray-400 text-sm">{releaseYear}</Text>
          <Text className="text-gray-600 mx-2">|</Text>
          <Text className="text-gray-400 text-sm">{details.runtime} phút</Text>
          <Text className="text-gray-600 mx-2">|</Text>
          <View className="flex-row items-center bg-yellow-500/20 px-2 py-0.5 rounded">
            <Text className="text-yellow-500 mr-1 text-xs">★</Text>
            <Text className="text-yellow-500 font-bold text-xs">{details.vote_average.toFixed(1)}</Text>
          </View>
        </View>

        {/* Genres */}
        <View className="flex-row flex-wrap mb-5 gap-2">
          {details.genres.map((genre) => (
            <View key={genre.id} className="bg-[#262626] px-3 py-1.5 rounded-full">
              <Text className="text-gray-300 text-xs">{genre.name}</Text>
            </View>
          ))}
        </View>

        {/* Overview */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Mô tả</Text>
          <Text className="text-gray-300 text-sm leading-5">{details.overview || "Không có mô tả cho bộ phim này."}</Text>
        </View>

        {/* Reviews Section */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Đánh giá ({reviews.length})</Text>
          {reviews.length === 0 ? (
            <Text className="text-gray-500 text-sm italic">Chưa có đánh giá nào cho bộ phim này.</Text>
          ) : (
            reviews.map((review) => <ReviewItem key={review.id} review={review} />)
          )}
        </View>
      </View>
    </ScrollView>
  );
}
