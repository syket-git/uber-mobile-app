import { icons } from "@/constants";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
const OAuth = () => {
  return (
    <View>
      <View className="flex flex-row justify-center items-center gap-x-3 mt-4">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="font-JakartaSemiBold">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100"></View>
      </View>

      <CustomButton
        title="Login with Google"
        bgVariant="outline"
        className="mt-5 w-full flex flex-row justify-center items-center"
        onPress={() => {}}
        IconLeft={() => (
          <Image
            className="w-5 h-5 mx-2"
            source={icons.google}
            resizeMode="contain"
          />
        )}
        textVariant="primary"
      />
    </View>
  );
};
export default OAuth;