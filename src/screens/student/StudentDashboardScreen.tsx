import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/navigation/types';
import { useAuth } from '@/context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { StatCard } from '../../components/StatCard';
import { Loading } from '../../components/Loading';
import { ComplaintStats } from '../../types';

type StudentDashboardProps = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'StudentDashboard'>;
};

export const StudentDashboardScreen: React.FC<StudentDashboardProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ComplaintStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await complaintService.getStudentStats();
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchStats();
    });
    return unsubscribe;
  }, [navigation]);

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
      <View className="bg-blue-500 px-6 pb-8 pt-12">
        <Text className="text-2xl font-bold text-white">Welcome Back!</Text>
        <Text className="mt-1 text-lg text-blue-100">{user?.name}</Text>
        <Text className="text-sm text-blue-200">{user?.enrollmentNumber}</Text>
      </View>

      <View className="px-6 py-6">
        <Text className="mb-4 text-xl font-bold text-gray-900">Your Complaints</Text>

        <View className="mb-4 gap-4">
          <StatCard
            title="Total Complaints"
            value={stats?.total || 0}
            color="blue"
            onPress={() => navigation.navigate('MyComplaints')}
          />
          <StatCard
            title="Pending"
            value={stats?.pending || 0}
            color="yellow"
            onPress={() => navigation.navigate('MyComplaints')}
          />
          <StatCard
            title="In Progress"
            value={stats?.inProgress || 0}
            color="purple"
            onPress={() => navigation.navigate('MyComplaints')}
          />
          <StatCard
            title="Resolved"
            value={stats?.resolved || 0}
            color="green"
            onPress={() => navigation.navigate('MyComplaints')}
          />
        </View>
      </View>
    </ScrollView>
  );
};
