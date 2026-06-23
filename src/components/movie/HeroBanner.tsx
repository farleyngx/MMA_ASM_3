import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { Movie } from "../../types";
import { getImageUrl } from "../../utils/imageBuilder";
import { Button } from "../common/Button";
import { FavoriteToggle } from "./FavoriteToggle";

interface HeroBannerProps {
  movie: Movie | null;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {
  if (!movie) return null;

  const posterUrl = getImageUrl(movie.poster_path, true);

  return (
    <View className="w-full h-[480px] mb-6">
      <ImageBackground
        source={{ uri: posterUrl }}
        className="w-full h-full justify-end"
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "rgba(20, 20, 20, 0.4)", "#141414"]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View className="px-6 pb-6 items-center">
          <Text className="text-white text-3xl font-black text-center mb-2 tracking-wide uppercase">
            {movie.title}
          </Text>

          <Text className="text-gray-300 text-xs text-center mb-4 px-6" numberOfLines={2}>
            {movie.overview}
          </Text>

          <View className="flex-row items-center justify-center gap-4">
            <Link href={`/movie/${movie.id}`} asChild>
              <Button
                title="Chi tiết"
                onPress={() => { }}
                variant="secondary"
                className="min-w-[140px] h-[44px]"
              />
            </Link>
            <View className="bg-black/40 rounded-full w-11 h-11 items-center justify-center">
              <FavoriteToggle movieId={movie.id} size={24} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
