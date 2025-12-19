import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface StatCardProps {
  title: string;
  value: number;
  color?: string;
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, color = 'blue', onPress }) => {
  const getColorClasses = () => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 border-blue-500',
      yellow: 'bg-yellow-100 border-yellow-500',
      green: 'bg-green-100 border-green-500',
      purple: 'bg-purple-100 border-purple-500',
    };
    return colors[color] || colors.blue;
  };

  const CardContent = (
    <View className={`rounded-lg border-l-4 p-4 ${getColorClasses()}`}>
      <Text className="text-sm font-medium text-gray-600">{title}</Text>
      <Text className="mt-1 text-3xl font-bold text-gray-900">{value}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className="active:opacity-80">
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
};
