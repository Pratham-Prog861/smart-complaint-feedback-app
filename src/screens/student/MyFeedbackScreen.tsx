import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { StudentStackParamList } from '@/navigation/types';
import { complaintService } from '../../services/complaintService';
import { Loading } from '../../components/Loading';
import { Complaint } from '../../types';

type MyFeedbackProps = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'MyFeedback'>;
};

export const MyFeedbackScreen: React.FC<MyFeedbackProps> = ({ navigation }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchResolvedComplaints = async () => {
    try {
      const data = await complaintService.getMyComplaints();
      // Filter only resolved complaints
      const resolved = data.complaints.filter((c: Complaint) => c.status === 'Resolved');
      setComplaints(resolved);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchResolvedComplaints();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchResolvedComplaints();
  }, []);

  const getStatusColor = (hasFeedback: boolean) => {
    return hasFeedback ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  if (loading) {
    return <Loading message="Loading resolved complaints..." />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="bg-blue-500 px-6 pb-6 pt-8">
        <Text className="text-2xl font-bold text-white">Give Feedback</Text>
        <Text className="mt-2 text-sm text-blue-100">
          Rate your experience on resolved complaints
        </Text>
        <View className="mt-3 flex-row items-center">
          <View className="rounded-full bg-blue-400 px-4 py-2">
            <Text className="text-sm font-semibold text-white">
              ⭐ {complaints.length} Resolved
            </Text>
          </View>
        </View>
      </View>

      <View className="px-6 py-6">
        {complaints.length === 0 ? (
          <View className="items-center rounded-2xl bg-white p-12 shadow-sm">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Text className="text-4xl">✅</Text>
            </View>
            <Text className="text-lg font-bold text-gray-900">No Resolved Complaints</Text>
            <Text className="mt-2 text-center text-sm text-gray-600">
              Once your complaints are resolved, you&apos;ll be able to give feedback here
            </Text>
          </View>
        ) : (
          <View className="gap-4">
            {complaints.map((complaint) => (
              <Pressable
                key={complaint._id}
                className="rounded-2xl bg-white p-5 shadow-sm active:opacity-80"
                onPress={() => {
                  if (complaint.hasFeedback) {
                    // If feedback already given, show complaint detail
                    navigation.navigate('ComplaintDetail', { complaintId: complaint._id });
                  } else {
                    // If no feedback, navigate to give feedback
                    navigation.navigate('Feedback', { complaintId: complaint._id });
                  }
                }}>
                <View className="mb-3 flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>
                      {complaint.title}
                    </Text>
                    <Text className="mt-1 text-sm text-gray-600">{complaint.category}</Text>
                  </View>
                  <View
                    className={`rounded-full px-3 py-1 ${getStatusColor(complaint.hasFeedback)}`}>
                    <Text className="text-xs font-semibold">
                      {complaint.hasFeedback ? 'Feedback Given' : 'Pending Feedback'}
                    </Text>
                  </View>
                </View>

                <Text className="mb-3 text-sm text-gray-700" numberOfLines={2}>
                  {complaint.description}
                </Text>

                {complaint.adminResponse && (
                  <View className="mb-3 rounded-lg bg-green-50 p-3">
                    <Text className="mb-1 text-xs font-semibold text-green-800">
                      Admin Response:
                    </Text>
                    <Text className="text-sm text-green-900" numberOfLines={2}>
                      {complaint.adminResponse}
                    </Text>
                  </View>
                )}

                {complaint.hasFeedback ? (
                  <View className="mt-2 rounded-lg bg-green-50 p-3">
                    <Text className="text-center text-sm font-medium text-green-900">
                      ✅ Feedback submitted
                    </Text>
                  </View>
                ) : (
                  <View className="mt-2 rounded-lg bg-yellow-50 p-3">
                    <Text className="text-center text-sm font-medium text-yellow-900">
                      👆 Tap to give feedback
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
