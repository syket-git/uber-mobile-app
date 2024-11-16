import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      <TouchableOpacity
        className="w-full justify-end items-end p-5"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] rounded-full mx-1 bg-[#E2E8F0]" />
        }
        activeDot={
          <View className="w-[32px] rounded-full h-[4px] mx-1 bg-[#0286ff]" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
        index={activeIndex}
      >
        {onboarding.map((item) => {
          return (
            <View key={item.id} className="flex items-center justify-center">
              <Image
                source={item.image}
                className="w-full h-[300px]"
                resizeMode="contain"
              />
              <View className="flex flex-row items-center justify-center mt-10">
                <Text className="text-black text-3xl font-JakartaBold mx-10 text-center">
                  {item?.title}
                </Text>
              </View>
              <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          );
        })}
      </Swiper>

      <CustomButton
        onPress={() =>
          activeIndex === onboarding.length - 1
            ? router.replace("/(auth)/sign-up")
            : setActiveIndex((ind) => ind + 1)
        }
        title={activeIndex === onboarding.length - 1 ? "Get Started" : "Next"}
        textStyle="text-white"
        className="w-11/12 my-5"
      />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}