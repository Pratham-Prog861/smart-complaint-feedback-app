import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@/navigation/types';
import { feedbackService } from '../../services/feedbackService';
import { Loading } from '../../components/Loading';
import { Feedback } from '../../types';
import { Picker } from '@react-native-picker/picker';

type ViewFeedbackProps = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'ViewFeedback'>;
};

const categories = [
  'All',
  'Infrastructure',
  'Cleanliness',
  'Faculty',
  'IT',
  'Library',
  'Security',
  'General',
];

export const ViewFeedbackScreen: React.FC<ViewFeedbackProps> = ({ navigation }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchFeedbacks = async () => {
    try {
      const data = await feedbackService.getAllFeedbacks(
        categoryFilter === 'All' ? undefined : categoryFilter
      );
      setFeedbacks(data.feedbacks);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch feedbacks');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} className={`text-xl ${star <= rating ? '' : 'opacity-30'}`}>
            ⭐
          </Text>
        ))}
      </View>
    );
  };

  if (loading) {
    return <Loading message="Loading feedbacks..." />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="px-6 py-6">
        <Text className="mb-4 text-2xl font-bold text-gray-900">Student Feedbacks</Text>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700">Filter by Category</Text>
          <View className="rounded-lg border border-gray-300 bg-white">
            <Picker
              selectedValue={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}>
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>

        <Text className="mb-4 text-sm text-gray-600">Total: {feedbacks.length}</Text>

        {feedbacks.length === 0 ? (
          <View className="items-center py-12">
            <Text className="text-4xl">💬</Text>
            <Text className="mt-4 text-lg text-gray-600">No feedbacks yet</Text>
            <Text className="mt-2 text-sm text-gray-500">
              Feedbacks will appear here once students submit them
            </Text>
          </View>
        ) : (
          feedbacks.map((feedback) => (
            <View
              key={feedback._id}
              className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <View className="mb-3 flex-row items-center justify-between">
                <View>
                  <Text className="font-semibold text-gray-900">{feedback.student.name}</Text>
                  <Text className="text-sm text-gray-600">{feedback.student.enrollmentNumber}</Text>
                </View>
                {renderStars(feedback.rating)}
              </View>

              <View className="mb-2 self-start rounded-full bg-purple-100 px-3 py-1">
                <Text className="text-xs font-medium text-purple-800">{feedback.category}</Text>
              </View>

              <Text className="mt-2 text-gray-700">{feedback.comment}</Text>

              <Text className="mt-3 text-xs text-gray-500">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};
