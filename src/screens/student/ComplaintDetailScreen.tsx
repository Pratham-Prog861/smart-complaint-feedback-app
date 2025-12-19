import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { StudentStackParamList } from '@/navigation/types';
import { complaintService } from '../../services/complaintService';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Complaint } from '../../types';

type ComplaintDetailProps = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'ComplaintDetail'>;
  route: RouteProp<StudentStackParamList, 'ComplaintDetail'>;
};

export const ComplaintDetailScreen: React.FC<ComplaintDetailProps> = ({ navigation, route }) => {
  const { complaintId } = route.params;
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchComplaint = async () => {
    try {
      const data = await complaintService.getComplaintById(complaintId);
      setComplaint(data.complaint);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch complaint details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complaintId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-500';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-500';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-500';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-500';
    }
  };

  if (loading) {
    return <Loading message="Loading complaint details..." />;
  }

  if (!complaint) {
    return null;
  }

  const canGiveFeedback = complaint.status === 'Resolved' && !complaint.hasFeedback;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-6">
        <View className="rounded-2xl bg-white p-6 shadow-sm">
          <Text className="mb-4 text-2xl font-bold text-gray-900">{complaint.title}</Text>

          <View className={`mb-4 rounded-lg border-l-4 p-4 ${getStatusColor(complaint.status)}`}>
            <Text className="text-sm font-medium">Status</Text>
            <Text className="mt-1 text-lg font-bold">{complaint.status}</Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Category</Text>
            <Text className="text-base text-gray-900">{complaint.category}</Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Description</Text>
            <Text className="text-base text-gray-900">{complaint.description}</Text>
          </View>

          {complaint.adminResponse && (
            <View className="mb-4 rounded-lg bg-blue-50 p-4">
              <Text className="mb-2 text-sm font-medium text-blue-900">Admin Response</Text>
              <Text className="text-base text-blue-800">{complaint.adminResponse}</Text>
            </View>
          )}

          <View className="mb-4">
            <Text className="mb-2 text-sm font-medium text-gray-700">Submitted On</Text>
            <Text className="text-base text-gray-900">
              {new Date(complaint.createdAt).toLocaleString()}
            </Text>
          </View>

          {complaint.resolvedAt && (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Resolved On</Text>
              <Text className="text-base text-gray-900">
                {new Date(complaint.resolvedAt).toLocaleString()}
              </Text>
            </View>
          )}

          {canGiveFeedback && (
            <View className="mt-6">
              <Button
                title="Give Feedback"
                variant="success"
                onPress={() => navigation.navigate('Feedback', { complaintId: complaint._id })}
              />
            </View>
          )}

          {complaint.hasFeedback && (
            <View className="mt-4 rounded-lg bg-green-50 p-4">
              <Text className="text-center text-sm font-medium text-green-800">
                ✓ Feedback submitted for this complaint
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
