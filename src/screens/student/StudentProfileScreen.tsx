import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/navigation/types';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authService } from '../../services/authService';

type StudentProfileProps = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'StudentProfile'>;
};

export const StudentProfileScreen: React.FC<StudentProfileProps> = ({ navigation }) => {
  const { user, updateUser, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    department: user?.department || '',
    semester: user?.semester?.toString() || '',
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        department: formData.department.trim(),
        semester: formData.semester ? parseInt(formData.semester) : undefined,
      });

      updateUser(response.user);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      department: user?.department || '',
      semester: user?.semester?.toString() || '',
    });
    setIsEditing(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-blue-500 bg-gradient-to-br px-6 pb-12 pt-8">
        <View className="items-center">
          <View className="mb-4 h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow-lg">
            <Text className="text-5xl font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-xl font-bold text-white">{user?.name}</Text>
          <View className="mt-2 rounded-full bg-blue-400 px-4 py-1">
            <Text className="text-xs font-semibold text-white">{user?.role?.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View className="-mt-6 px-6 pb-6">
        <View className="rounded-2xl bg-white p-6 shadow-lg">
          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Email</Text>
            <Text className="rounded-lg bg-gray-100 px-4 py-3 text-base text-gray-700">
              {user?.email}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Enrollment Number</Text>
            <Text className="rounded-lg bg-gray-100 px-4 py-3 text-base text-gray-700">
              {user?.enrollmentNumber}
            </Text>
          </View>

          {isEditing ? (
            <>
              <Input
                label="Name"
                value={formData.name}
                onChangeText={(v) => updateField('name', v)}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChangeText={(v) => updateField('phone', v)}
                keyboardType="phone-pad"
              />
              <Input
                label="Department"
                value={formData.department}
                onChangeText={(v) => updateField('department', v)}
              />
              <Input
                label="Semester"
                value={formData.semester}
                onChangeText={(v) => updateField('semester', v)}
                keyboardType="numeric"
              />

              <Button title="Save Changes" onPress={handleUpdate} loading={loading} />
              <View className="mt-3">
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={handleCancel}
                  disabled={loading}
                />
              </View>
            </>
          ) : (
            <>
              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700">Name</Text>
                <Text className="text-base text-gray-900">{user?.name}</Text>
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700">Phone</Text>
                <Text className="text-base text-gray-900">{user?.phone || 'Not provided'}</Text>
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700">Department</Text>
                <Text className="text-base text-gray-900">{user?.department}</Text>
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700">Semester</Text>
                <Text className="text-base text-gray-900">{user?.semester}</Text>
              </View>

              <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
            </>
          )}

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
