import { Text, TouchableOpacity } from "react-native";

import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: string) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-500";
    case "success":
      return "text-green-500";
    case "white":
      return "text-white";
    default:
      return "text-[#0286ff]";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "primary",
  IconLeft,
  IconRight,
  className,
  textStyle,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`rounded-full shadow-md p-5 flex items-center justify-center shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      onPress={onPress}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)} ${textStyle}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};
export default CustomButton;