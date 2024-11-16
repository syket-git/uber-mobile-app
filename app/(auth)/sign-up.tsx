import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [pendingVerification, setPendingVerification] = useState(false);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const router = useRouter();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    setSignUpLoading(true);
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
      setSignUpLoading(false);
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
      setSignUpLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    if (!verification.code) {
      return;
    }

    setVerifyLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //TODO:create database user

        await setActive({ session: completeSignUp.createdSessionId });
        setVerifyLoading(false);
        setVerification({ ...verification, state: "success" });
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        setVerification({
          ...verification,
          state: "failed",
          error: "verification failed",
        });
        setVerifyLoading(false);
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
      setVerifyLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create your account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value: string) => setForm({ ...form, name: value })}
            labelStyle=""
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: string) => setForm({ ...form, email: value })}
            labelStyle=""
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: string) =>
              setForm({ ...form, password: value })
            }
            labelStyle=""
          />

          <CustomButton
            title={signUpLoading ? "Loading..." : "Sign Up"}
            disabled={signUpLoading}
            className="mt-6"
            textStyle="text-white"
            onPress={onSignUpPress}
          />
          <OAuth />
          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center mt-5 text-general-200"
          >
            <Text className="font-JakartaMedium">Already have an account?</Text>{" "}
            <Text className="font-JakartaSemiBold text-primary-500">Login</Text>
          </Link>
        </View>

        {/*OTP Input Modal*/}
        <ReactNativeModal
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
          isVisible={verification.state === "pending"}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code {form.email}
            </Text>
            <InputField
              label={"Code"}
              onChangeText={(e) =>
                setVerification({ ...verification, code: e })
              }
              keyboardType="numeric"
              icon={icons.lock}
              placeholder="1234"
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title={verifyLoading ? "Loading..." : "Verify Email"}
              disabled={verifyLoading}
              onPress={onPressVerify}
              className="mt-5"
              textStyle="text-white"
              bgVariant="success"
            />
          </View>
        </ReactNativeModal>

        {/*Verified Modal*/}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your accound
            </Text>
            <CustomButton
              title="Browse Home"
              className="mt-5"
              textStyle="text-white"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
}