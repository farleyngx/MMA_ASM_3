import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { Link } from "expo-router";
import { Movie } from "../../types";
import { getImageUrl } from "../../utils/imageBuilder";
import { getReleaseYear } from "../../utils/dateFormatter";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = getImageUrl(movie.poster_path);
  const releaseYear = getReleaseYear(movie.release_date);

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="w-[110px] mr-4 relative mb-4">
        <View className="rounded-md overflow-hidden bg-[#1f1f1f]">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[160px] rounded-md"
            resizeMode="cover"
            style={{ width: 110, height: 160 }}
          />
        </View>
        <Text className="text-white text-xs font-bold mt-2" numberOfLines={1}>
          {movie.title}
        </Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-gray-400 text-[10px]">{releaseYear}</Text>
          <View className="flex-row items-center">
            <Text className="text-yellow-500 text-[10px] mr-0.5">★</Text>
            <Text className="text-gray-300 text-[10px]">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
