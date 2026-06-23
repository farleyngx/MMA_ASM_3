import React from "react";
import { ActivityIndicator, View, Text } from "react-native";

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#141414]">
      <ActivityIndicator size="large" color="#E50914" />
      {message && (
        <Text className="text-white mt-4 font-semibold text-sm tracking-wider">
          {message}
        </Text>
      )}
    </View>
  );
};
