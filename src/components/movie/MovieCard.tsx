import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../../types";
import { getReleaseYear } from "../../utils/dateFormatter";
import { getImageUrl } from "../../utils/imageBuilder";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = getImageUrl(movie.poster_path);
  const releaseYear = getReleaseYear(movie.release_date);

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="w-[130px] ">
        <View className="rounded-md overflow-hidden bg-[#1f1f1f]">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[200px]"
            resizeMode="center"
          />
        </View>
        <Text className="text-white text-lg font-bold mt-2" numberOfLines={1}>
          {movie.title}
        </Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-gray-400 text-lg">{releaseYear}</Text>
          <View className="flex-row items-center">
            <Text className="text-yellow-500 text-lg mr-0.5">★</Text>
            <Text className="text-gray-300 text-lg">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
