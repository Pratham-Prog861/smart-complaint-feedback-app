import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@/navigation/types';
import { useAuth } from '@/context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { StatCard } from '../../components/StatCard';
import { Loading } from '../../components/Loading';
import { ComplaintStats } from '../../types';

type AdminDashboardProps = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'AdminDashboard'>;
};

export const AdminDashboardScreen: React.FC<AdminDashboardProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ComplaintStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await complaintService.getComplaintStats();
      setStats(data);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStats();
  }, []);

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View className="bg-purple-600 px-6 pb-8 pt-12">
        <Text className="text-2xl font-bold text-white">Admin Dashboard</Text>
        <Text className="mt-1 text-lg text-purple-100">{user?.name}</Text>
        <Text className="text-sm text-purple-200">Administrator</Text>
      </View>

      <View className="px-6 py-6">
        <Text className="mb-4 text-xl font-bold text-gray-900">Complaint Statistics</Text>

        <View className="mb-4 gap-4">
          <StatCard
            title="Total Complaints"
            value={stats?.total || 0}
            color="blue"
            onPress={() => navigation.navigate('AllComplaints')}
          />
          <StatCard
            title="Pending"
            value={stats?.pending || 0}
            color="yellow"
            onPress={() => navigation.navigate('AllComplaints')}
          />
          <StatCard
            title="In Progress"
            value={stats?.inProgress || 0}
            color="purple"
            onPress={() => navigation.navigate('AllComplaints')}
          />
          <StatCard
            title="Resolved"
            value={stats?.resolved || 0}
            color="green"
            onPress={() => navigation.navigate('AllComplaints')}
          />
        </View>

        {stats?.categoryStats && stats.categoryStats.length > 0 && (
          <View className="mt-6">
            <Text className="mb-4 text-lg font-bold text-gray-900">By Category</Text>
            {stats.categoryStats.map((cat) => (
              <View
                key={cat._id}
                className="mb-2 flex-row justify-between rounded-lg bg-white p-4 shadow-sm">
                <Text className="font-medium text-gray-900">{cat._id}</Text>
                <Text className="font-bold text-blue-600">{cat.count}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
