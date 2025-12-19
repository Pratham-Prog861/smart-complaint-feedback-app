import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/navigation/types';
import { complaintService } from '../../services/complaintService';
import { ComplaintCard } from '../../components/ComplaintCard';
import { Loading } from '../../components/Loading';
import { Complaint } from '../../types';

type MyComplaintsProps = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'MyComplaints'>;
};

export const MyComplaintsScreen: React.FC<MyComplaintsProps> = ({ navigation }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComplaints = async () => {
    try {
      const data = await complaintService.getMyComplaints();
      setComplaints(data.complaints);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchComplaints();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchComplaints();
  }, []);

  if (loading) {
    return <Loading message="Loading complaints..." />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="bg-blue-500 px-6 pb-6 pt-8">
        <Text className="text-2xl font-bold text-white">My Complaints</Text>
        <View className="mt-3 flex-row items-center">
          <View className="rounded-full bg-blue-400 px-4 py-2">
            <Text className="text-sm font-semibold text-white">📋 Total: {complaints.length}</Text>
          </View>
        </View>
      </View>

      <View className="px-6 py-6">
        {complaints.length === 0 ? (
          <View className="items-center rounded-2xl bg-white p-12 shadow-sm">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Text className="text-4xl">📝</Text>
            </View>
            <Text className="text-lg font-bold text-gray-900">No complaints yet</Text>
            <Text className="mt-2 text-center text-sm text-gray-600">
              Tap the &quot;New&quot; tab to raise your first complaint
            </Text>
          </View>
        ) : (
          complaints.map((complaint) => (
            <ComplaintCard
              key={complaint._id}
              complaint={complaint}
              onPress={() => navigation.navigate('ComplaintDetail', { complaintId: complaint._id })}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};
