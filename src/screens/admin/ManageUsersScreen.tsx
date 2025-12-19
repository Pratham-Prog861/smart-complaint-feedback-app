import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@/navigation/types';
import { userService } from '../../services/userService';
import { Loading } from '../../components/Loading';
import { User } from '../../types';

type ManageUsersProps = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'ManageUsers'>;
};

export const ManageUsersScreen: React.FC<ManageUsersProps> = ({ navigation }) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStudents = async () => {
    try {
      const data = await userService.getAllStudents();
      setStudents(data.students);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStudents();
  }, []);

  const handleToggleStatus = async (studentId: string, currentStatus: boolean) => {
    Alert.alert(
      'Confirm',
      `Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this student?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await userService.toggleStudentStatus(studentId);
              fetchStudents();
              Alert.alert('Success', 'Student status updated');
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.message || 'Failed to update status');
            }
          },
        },
      ]
    );
  };

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    Alert.alert(
      'Delete Student',
      `Are you sure you want to delete ${studentName}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await userService.deleteStudent(studentId);
              fetchStudents();
              Alert.alert('Success', 'Student deleted successfully');
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.message || 'Failed to delete student');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <Loading message="Loading students..." />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="px-6 py-6">
        <Text className="mb-4 text-2xl font-bold text-gray-900">Manage Students</Text>
        <Text className="mb-6 text-sm text-gray-600">Total Students: {students.length}</Text>

        {students.length === 0 ? (
          <View className="items-center py-12">
            <Text className="text-4xl">👥</Text>
            <Text className="mt-4 text-lg text-gray-600">No students registered yet</Text>
          </View>
        ) : (
          students.map((student) => (
            <View
              key={student.id}
              className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <View className="mb-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-gray-900">{student.name}</Text>
                  <View
                    className={`rounded-full px-3 py-1 ${
                      student.isActive ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    <Text
                      className={`text-xs font-medium ${
                        student.isActive ? 'text-green-800' : 'text-red-800'
                      }`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>
                <Text className="mt-1 text-sm text-gray-600">{student.email}</Text>
                <Text className="text-sm text-gray-600">{student.enrollmentNumber}</Text>
                <Text className="text-sm text-gray-600">
                  {student.department} • Semester {student.semester}
                </Text>
                {student.phone && <Text className="text-sm text-gray-600">📞 {student.phone}</Text>}
              </View>

              <View className="flex-row gap-2">
                <Pressable
                  key={`toggle-${student.id}`}
                  onPress={() => handleToggleStatus(student.id, student.isActive || false)}
                  className={`flex-1 rounded-lg px-4 py-2 ${
                    student.isActive ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                  <Text className="text-center text-sm font-semibold text-white">
                    {student.isActive ? 'Deactivate' : 'Activate'}
                  </Text>
                </Pressable>
                <Pressable
                  key={`delete-${student.id}`}
                  onPress={() => handleDeleteStudent(student.id, student.name)}
                  className="flex-1 rounded-lg bg-red-500 px-4 py-2">
                  <Text className="text-center text-sm font-semibold text-white">Delete</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};
