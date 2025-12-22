import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, Animated } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, secureTextEntry, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [iconScale] = useState(new Animated.Value(1));

  const togglePasswordVisibility = () => {
    // Smooth animation for eye icon
    Animated.sequence([
      Animated.timing(iconScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(iconScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text>
      <View className="relative">
        <TextInput
          className={`rounded-lg border bg-white px-4 py-3 text-base text-gray-900 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${secureTextEntry ? 'pr-12' : ''}`}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-3 top-3"
            activeOpacity={0.7}>
            <Animated.Text style={{ transform: [{ scale: iconScale }] }} className="text-2xl">
              {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </Animated.Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
};
