import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600">
      <View className="items-center">
        <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-2xl">
          <Text className="text-6xl">📋</Text>
        </View>
        <Text className="text-4xl font-bold text-white">Smart Complaint</Text>
        <Text className="mt-2 text-2xl font-semibold text-blue-100">& Feedback System</Text>
        <View className="mt-8 h-1 w-16 rounded-full bg-white opacity-50" />
      </View>
    </View>
  );
};
