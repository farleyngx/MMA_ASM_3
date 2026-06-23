import { HeroBanner } from "../../components/movie/HeroBanner";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Loader } from "../../components/common/Loader";
import { HorizontalList } from "../../components/movie/HorizontalList";
import { useTrending } from "../../hooks/useTrending";

export default function HomeScreen() {
  const { movies, loading, error, refetch } = useTrending();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-netflix-black">
        <View className="flex-row justify-between items-center px-4 py-3">
          <Text className="text-netflix-red text-[28px] font-black tracking-tighter">
            NEEDFLEX
          </Text>
          <Link href="/search" asChild>
            <TouchableOpacity className="p-2">
              <Ionicons name="search" size={26} color="#ffffff" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex-row justify-center items-center mt-16">
          <Loader message="Đang tải danh sách phim..." />
        </View>
      </SafeAreaView >
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-netflix-black">
        <View className="flex-row justify-between items-center px-4 py-3">
          <Text className="text-netflix-red text-[28px] font-black tracking-tighter">
            NEEDFLEX
          </Text>
          <Link href="/search" asChild>
            <TouchableOpacity className="p-2">
              <Ionicons name="search" size={26} color="#ffffff" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex justify-center items-center bg-netflix-black p-6">
          <Text className="text-white text-base mb-4 text-center">{error}</Text>
          <TouchableOpacity onPress={refetch} className="bg-netflix-red px-6 py-2 rounded-full">
            <Text className="text-white font-bold">Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
    );
  }

  const heroMovie = movies.length > 0 ? movies[0] : null;
  const trendingList = movies.slice(0, 10);
  const watchNextList = movies.slice(10, 20);

  return (
    <SafeAreaView className="flex-1 bg-netflix-black">
      {/* Custom Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-netflix-black">
        <Text className="text-netflix-red text-[28px] font-black tracking-tighter">
          NEEDFLEX
        </Text>
        <Link href="/search" asChild>
          <TouchableOpacity className="p-2">
            <Ionicons name="search" size={26} color="#ffffff" />
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView className="mb-16" showsVerticalScrollIndicator={false}>
        {heroMovie && <HeroBanner movie={heroMovie} />}

        <HorizontalList title="Phim đang thịnh hành" movies={trendingList} />

        {watchNextList.length > 0 && (
          <HorizontalList title="Gợi ý dành cho bạn" movies={watchNextList} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
