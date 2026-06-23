import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <View className="flex bg-[#141414]">
      <ActivityIndicator size="large" color="#E50914" />
      {message && (
        <Text className="text-white mt-4 font-semibold text-xl tracking-wider">
          {message}
        </Text>
      )}
    </View>
  );
};
