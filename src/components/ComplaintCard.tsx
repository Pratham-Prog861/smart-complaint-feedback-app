import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Complaint } from '../types';

interface ComplaintCardProps {
  complaint: Complaint;
  onPress: () => void;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Infrastructure: 'bg-purple-100 text-purple-800',
      Cleanliness: 'bg-teal-100 text-teal-800',
      Faculty: 'bg-indigo-100 text-indigo-800',
      IT: 'bg-cyan-100 text-cyan-800',
      Library: 'bg-pink-100 text-pink-800',
      Security: 'bg-red-100 text-red-800',
      General: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="flex-1 text-lg font-semibold text-gray-900" numberOfLines={1}>
          {complaint.title}
        </Text>
      </View>

      <Text className="mb-3 text-sm text-gray-600" numberOfLines={2}>
        {complaint.description}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-2">
          <View className={`rounded-full px-3 py-1 ${getCategoryColor(complaint.category)}`}>
            <Text className="text-xs font-medium">{complaint.category}</Text>
          </View>
          <View className={`rounded-full px-3 py-1 ${getStatusColor(complaint.status)}`}>
            <Text className="text-xs font-medium">{complaint.status}</Text>
          </View>
        </View>
      </View>

      <Text className="mt-2 text-xs text-gray-500">
        {new Date(complaint.createdAt).toLocaleDateString()}
      </Text>
    </Pressable>
  );
};
