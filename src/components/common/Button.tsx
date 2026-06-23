import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  let buttonClass = "py-3 px-6 rounded-md items-center justify-center flex-row ";
  let textClass = "font-bold text-xl ";

  if (variant === "primary") {
    buttonClass += "bg-[#E50914] active:bg-[#B20710]";
    textClass += "text-white";
  } else if (variant === "secondary") {
    buttonClass += "bg-white active:bg-gray-200";
    textClass += "text-black";
  } else if (variant === "outline") {
    buttonClass += "border border-gray-500 bg-transparent active:bg-gray-800";
    textClass += "text-white";
  }

  if (disabled) {
    buttonClass += " opacity-50";
  }

  // Append extra className from parent
  const combinedClass = `${buttonClass} ${className}`.trim();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={combinedClass}
    >
      <Text className={textClass}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
