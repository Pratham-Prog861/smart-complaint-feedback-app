import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from '@/navigation/types';
import { complaintService } from '../../services/complaintService';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Loading } from '../../components/Loading';
import { Complaint, ComplaintStatus } from '../../types';
import { Picker } from '@react-native-picker/picker';

type AdminComplaintDetailProps = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'AdminComplaintDetail'>;
  route: RouteProp<AdminStackParamList, 'AdminComplaintDetail'>;
};

const statuses: ComplaintStatus[] = ['Pending', 'In Progress', 'Resolved'];

export const AdminComplaintDetailScreen: React.FC<AdminComplaintDetailProps> = ({
  navigation,
  route,
}) => {
  const { complaintId } = route.params;
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<ComplaintStatus>('Pending');
  const [adminResponse, setAdminResponse] = useState('');

  const fetchComplaint = async () => {
    try {
      const data = await complaintService.getComplaintById(complaintId);
      setComplaint(data.complaint);
      setStatus(data.complaint.status);
      setAdminResponse(data.complaint.adminResponse || '');
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

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await complaintService.updateComplaintStatus(complaintId, {
        status,
        adminResponse: adminResponse.trim(),
      });

      Alert.alert('Success', 'Complaint updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-6 py-6">
          <View className="rounded-2xl bg-white p-6 shadow-sm">
            <Text className="mb-4 text-2xl font-bold text-gray-900">{complaint.title}</Text>

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Student Information</Text>
              <Text className="text-base text-gray-900">{complaint.student.name}</Text>
              <Text className="text-sm text-gray-600">{complaint.student.email}</Text>
              <Text className="text-sm text-gray-600">
                {complaint.student.enrollmentNumber} • {complaint.student.department}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Category</Text>
              <Text className="text-base text-gray-900">{complaint.category}</Text>
            </View>

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Description</Text>
              <Text className="text-base text-gray-900">{complaint.description}</Text>
            </View>

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Current Status</Text>
              <View className={`rounded-lg border-l-4 p-4 ${getStatusColor(complaint.status)}`}>
                <Text className="text-lg font-bold">{complaint.status}</Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Submitted On</Text>
              <Text className="text-base text-gray-900">
                {new Date(complaint.createdAt).toLocaleString()}
              </Text>
            </View>

            <View className="my-6 border-t border-gray-200 pt-6">
              <Text className="mb-4 text-xl font-bold text-gray-900">Update Complaint</Text>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700">Update Status</Text>
                <View className="rounded-lg border border-gray-300 bg-white">
                  <Picker
                    selectedValue={status}
                    onValueChange={(value) => setStatus(value as ComplaintStatus)}>
                    {statuses.map((s) => (
                      <Picker.Item key={s} label={s} value={s} />
                    ))}
                  </Picker>
                </View>
              </View>

              <Input
                label="Admin Response"
                placeholder="Enter your response..."
                value={adminResponse}
                onChangeText={setAdminResponse}
                multiline
                numberOfLines={6}
                style={{ minHeight: 120, textAlignVertical: 'top' }}
              />

              <Button title="Update Complaint" onPress={handleUpdate} loading={updating} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
