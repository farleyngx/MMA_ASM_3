import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../../hooks/useFavorites";

interface FavoriteToggleProps {
  movieId: number;
  size?: number;
  color?: string;
}

export const FavoriteToggle: React.FC<FavoriteToggleProps> = ({
  movieId,
  size = 28,
  color = "#E50914",
}) => {
  const { isFavorite, toggleFavorite, loading } = useFavorites();

  if (loading) {
    return <ActivityIndicator size="small" color={color} />;
  }

  const active = isFavorite(movieId);

  return (
    <TouchableOpacity onPress={() => toggleFavorite(movieId)} className="p-2">
      <Ionicons
        name={active ? "heart" : "heart-outline"}
        size={size}
        color={active ? color : "#ffffff"}
      />
    </TouchableOpacity>
  );
};
