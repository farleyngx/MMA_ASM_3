import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Review } from "../../types";
import { formatDate } from "../../utils/dateFormatter";

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const formattedDate = formatDate(review.created_at);
  const rating = review.author_details?.rating;

  return (
    <View className="bg-[#1f1f1f] p-4 rounded-lg mb-3">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <View className="bg-[#E50914] w-8 h-8 rounded-full items-center justify-center mr-2">
            <Text className="text-white font-bold text-sm">
              {review.author ? review.author[0].toUpperCase() : "?"}
            </Text>
          </View>
          <View>
            <Text className="text-white font-bold text-sm">{review.author}</Text>
            <Text className="text-gray-500 text-[10px]">{formattedDate}</Text>
          </View>
        </View>
        {rating !== null && rating !== undefined && (
          <View className="bg-yellow-500/20 px-2 py-0.5 rounded flex-row items-center">
            <Text className="text-yellow-500 text-xs mr-0.5">★</Text>
            <Text className="text-yellow-500 text-xs font-bold">{rating}/10</Text>
          </View>
        )}
      </View>
      <Text
        className="text-gray-300 text-xs leading-relaxed"
        numberOfLines={expanded ? undefined : 4}
      >
        {review.content}
      </Text>
      {review.content.length > 200 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)} className="mt-2">
          <Text className="text-[#E50914] text-xs font-bold">
            {expanded ? "Thu gọn" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
