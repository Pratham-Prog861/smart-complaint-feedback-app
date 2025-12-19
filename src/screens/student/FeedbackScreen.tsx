import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { StudentStackParamList } from '@/navigation/types';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { feedbackService } from '../../services/feedbackService';

type FeedbackProps = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'Feedback'>;
  route: RouteProp<StudentStackParamList, 'Feedback'>;
};

export const FeedbackScreen: React.FC<FeedbackProps> = ({ navigation, route }) => {
  const { complaintId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter your feedback comment');
      return;
    }

    setLoading(true);
    try {
      await feedbackService.submitFeedback({
        complaintId,
        rating,
        comment: comment.trim(),
      });

      Alert.alert('Success', 'Feedback submitted successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('StudentDashboard'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const StarRating = () => {
    return (
      <View className="mb-4">
        <Text className="mb-3 text-sm font-medium text-gray-700">Rating *</Text>
        <View className="flex-row justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Text className={`text-4xl ${star <= rating ? '' : 'opacity-30'}`}>⭐</Text>
            </Pressable>
          ))}
        </View>
        <Text className="mt-2 text-center text-sm text-gray-600">
          {rating === 0 ? 'Tap to rate' : `${rating} out of 5`}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-6 py-6">
          <Text className="mb-6 text-2xl font-bold text-gray-900">Submit Feedback</Text>

          <View className="rounded-2xl bg-white p-6 shadow-sm">
            <View className="mb-6 rounded-lg bg-blue-50 p-4">
              <Text className="text-sm text-blue-900">
                Please rate your experience with the resolution of your complaint and provide your
                feedback.
              </Text>
            </View>

            <StarRating />

            <Input
              label="Your Feedback *"
              placeholder="Share your experience..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={6}
              style={{ minHeight: 120, textAlignVertical: 'top' }}
            />

            <Button title="Submit Feedback" onPress={handleSubmit} loading={loading} />

            <View className="mt-3">
              <Button
                title="Cancel"
                variant="secondary"
                onPress={() => navigation.goBack()}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
