import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_KEY = "@movie_favorites";

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (movieId: number) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Load list of IDs on startup (only once)
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITE_KEY);
        if (stored) setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading favorites from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  // Handle Add/Remove from favorites
  const toggleFavorite = async (movieId: number) => {
    let updatedFavorites = [...favorites];

    if (updatedFavorites.includes(movieId)) {
      updatedFavorites = updatedFavorites.filter((id) => id !== movieId); // Remove if exists
    } else {
      updatedFavorites.push(movieId); // Add if not exists
    }

    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorites to AsyncStorage:", error);
    }
  };

  const isFavorite = (movieId: number) => favorites.includes(movieId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

