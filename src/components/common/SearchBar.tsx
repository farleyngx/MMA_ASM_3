import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Tìm kiếm phim...",
  onClear,
}) => {
  return (
    <View className="flex-row items-center bg-[#333333] px-3 py-2 rounded-md mx-4 my-2">
      <Ionicons name="search" size={20} color="#B3B3B3" style={{ marginRight: 8 }} />
      <TextInput
        className="flex-1 text-white text-xl py-1"
        placeholder={placeholder}
        placeholderTextColor="#B3B3B3"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        style={{ paddingVertical: 4 }}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear || (() => onChangeText(""))}>
          <Ionicons name="close-circle" size={20} color="#B3B3B3" />
        </TouchableOpacity>
      )}
    </View>
  );
};
