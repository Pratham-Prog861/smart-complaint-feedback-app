import React from 'react';
import { Text, Pressable, PressableProps, ActivityIndicator } from 'react-native';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500';
      case 'secondary':
        return 'bg-gray-100 border border-gray-300';
      case 'danger':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getTextColor = () => {
    return variant === 'secondary' ? 'text-gray-900' : 'text-white';
  };

  return (
    <Pressable
      className={`rounded-lg px-6 py-3 ${getVariantStyles()} ${
        disabled || loading ? 'opacity-50' : 'active:opacity-80'
      }`}
      disabled={disabled || loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#000000' : '#FFFFFF'} />
      ) : (
        <Text className={`text-center text-base font-semibold ${getTextColor()}`}>{title}</Text>
      )}
    </Pressable>
  );
};
