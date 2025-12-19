import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminStackParamList } from './types';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AllComplaintsScreen } from '../screens/admin/AllComplaintsScreen';
import { AdminComplaintDetailScreen } from '../screens/admin/AdminComplaintDetailScreen';
import { ViewFeedbackScreen } from '../screens/admin/ViewFeedbackScreen';
import { ManageUsersScreen } from '../screens/admin/ManageUsersScreen';
import { AdminProfileScreen } from '../screens/admin/AdminProfileScreen';

const Stack = createNativeStackNavigator<AdminStackParamList>();

export const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9333EA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllComplaints"
        component={AllComplaintsScreen}
        options={{ title: 'All Complaints' }}
      />
      <Stack.Screen
        name="AdminComplaintDetail"
        component={AdminComplaintDetailScreen}
        options={{ title: 'Complaint Details' }}
      />
      <Stack.Screen
        name="ViewFeedback"
        component={ViewFeedbackScreen}
        options={{ title: 'Student Feedbacks' }}
      />
      <Stack.Screen
        name="ManageUsers"
        component={ManageUsersScreen}
        options={{ title: 'Manage Students' }}
      />
      <Stack.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
        options={{ title: 'Admin Profile' }}
      />
    </Stack.Navigator>
  );
};
