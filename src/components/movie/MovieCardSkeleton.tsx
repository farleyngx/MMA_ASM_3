import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

export const MovieCardSkeleton: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
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
    <View className="w-[110px] mr-4 relative mb-4">
      {/* Poster placeholder */}
      <View className="rounded-md overflow-hidden bg-[#1f1f1f]">
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="w-[110px] h-[160px] bg-[#333333] rounded-md"
        />
      </View>
      {/* Title placeholder */}
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="w-[90px] h-3 bg-[#333333] rounded mt-2.5"
      />
      {/* Release year and Rating placeholder */}
      <View className="flex-row justify-between items-center mt-1.5">
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="w-[30px] h-2.5 bg-[#333333] rounded"
        />
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="w-[35px] h-2.5 bg-[#333333] rounded"
        />
      </View>
    </View>
  );
};
