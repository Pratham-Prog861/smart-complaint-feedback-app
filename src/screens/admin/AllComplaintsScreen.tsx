import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@/navigation/types';
import { complaintService } from '../../services/complaintService';
import { ComplaintCard } from '../../components/ComplaintCard';
import { Loading } from '../../components/Loading';
import { Complaint } from '../../types';
import { Picker } from '@react-native-picker/picker';

type AllComplaintsProps = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'AllComplaints'>;
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
const statuses = ['All', 'Pending', 'In Progress', 'Resolved'];

export const AllComplaintsScreen: React.FC<AllComplaintsProps> = ({ navigation }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchComplaints = async () => {
    try {
      const data = await complaintService.getAllComplaints(
        categoryFilter === 'All' ? undefined : categoryFilter,
        statusFilter === 'All' ? undefined : statusFilter
      );
      setComplaints(data.complaints);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, statusFilter]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchComplaints();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, categoryFilter, statusFilter]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, statusFilter]);

  if (loading) {
    return <Loading message="Loading complaints..." />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="px-6 py-6">
        <Text className="mb-4 text-2xl font-bold text-gray-900">All Complaints</Text>

        <View className="mb-4 gap-4">
          <View>
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

          <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">Filter by Status</Text>
            <View className="rounded-lg border border-gray-300 bg-white">
              <Picker
                selectedValue={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}>
                {statuses.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <Text className="mb-4 text-sm text-gray-600">Total: {complaints.length}</Text>

        {complaints.length === 0 ? (
          <View className="items-center py-12">
            <Text className="text-4xl">📋</Text>
            <Text className="mt-4 text-lg text-gray-600">No complaints found</Text>
            <Text className="mt-2 text-sm text-gray-500">Try adjusting the filters</Text>
          </View>
        ) : (
          complaints.map((complaint) => (
            <ComplaintCard
              key={complaint._id}
              complaint={complaint}
              onPress={() =>
                navigation.navigate('AdminComplaintDetail', { complaintId: complaint._id })
              }
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};
