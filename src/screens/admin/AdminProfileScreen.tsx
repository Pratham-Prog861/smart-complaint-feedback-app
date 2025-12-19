import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@/navigation/types';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';

type AdminProfileProps = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'AdminProfile'>;
};

export const AdminProfileScreen: React.FC<AdminProfileProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-6">
        <Text className="mb-6 text-2xl font-bold text-gray-900">Admin Profile</Text>

        <View className="rounded-2xl bg-white p-6 shadow-sm">
          <View className="mb-6 items-center">
            <View className="mb-3 h-24 w-24 items-center justify-center rounded-full bg-purple-600">
              <Text className="text-4xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-sm text-gray-600">ADMINISTRATOR</Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Name</Text>
            <Text className="text-base text-gray-900">{user?.name}</Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Email</Text>
            <Text className="text-base text-gray-900">{user?.email}</Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Role</Text>
            <Text className="text-base text-gray-900">Administrator</Text>
          </View>

          <View className="mt-6 rounded-lg bg-purple-50 p-4">
            <Text className="text-sm text-purple-900">
              As an administrator, you have full access to manage complaints, view feedback, and
              manage student users in the system.
            </Text>
          </View>

          <View className="mt-6">
            <Button
              title="Logout"
              variant="danger"
              onPress={() => {
                Alert.alert('Logout', 'Are you sure you want to logout?', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: logout,
                  },
                ]);
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
