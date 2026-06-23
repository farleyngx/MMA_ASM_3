import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { ImageBackground, Text, View, Animated } from "react-native";
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
    <View className="w-full h-[380px] mb-6">
      <ImageBackground
        source={{ uri: posterUrl }}
        className="w-full h-full justify-end"
        resizeMode="none"
      >
        <LinearGradient
          colors={["transparent", "rgba(20, 20, 20, 0.4)", "#141414"]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View className="px-6 pb-6 items-center">
          <Text className="text-white text-4xl font-bold text-center mb-2 tracking-wider uppercase">
            {movie.title}
          </Text>

          <Text className="text-gray-300 text-xs text-center mb-4 px-6" numberOfLines={2}>
            {movie.overview}
          </Text>

          <View className="flex-row items-center justify-center gap-4">
            <Link href={`/movie/${movie.id}`} asChild>
              <Button
                title="Xem phim"
                onPress={() => { }}
                variant="primary"
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

export const HeroBannerSkeleton: React.FC = () => {
  const fadeAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View className="w-full h-[380px] mb-6 bg-[#141414] justify-end">
      <Animated.View 
        style={{ opacity: fadeAnim }} 
        className="w-full h-full absolute bg-[#1f1f1f]" 
      />
      <View className="px-6 pb-6 items-center z-10">
        {/* Title skeleton */}
        <Animated.View 
          style={{ opacity: fadeAnim }} 
          className="w-3/4 h-8 bg-[#333333] rounded mb-3" 
        />
        {/* Subtitle/Overview lines skeletons */}
        <Animated.View 
          style={{ opacity: fadeAnim }} 
          className="w-1/2 h-3 bg-[#333333] rounded mb-2" 
        />
        <Animated.View 
          style={{ opacity: fadeAnim }} 
          className="w-2/3 h-3 bg-[#333333] rounded mb-5" 
        />
        {/* Buttons skeleton */}
        <View className="flex-row items-center justify-center gap-4">
          <Animated.View 
            style={{ opacity: fadeAnim }} 
            className="w-[140px] h-[44px] bg-[#333333] rounded-md" 
          />
          <Animated.View 
            style={{ opacity: fadeAnim }} 
            className="w-11 h-11 bg-[#333333] rounded-full" 
          />
        </View>
      </View>
    </View>
  );
};
