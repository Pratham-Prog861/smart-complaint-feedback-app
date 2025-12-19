import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StudentStackParamList } from './types';
import { StudentDashboardScreen } from '../screens/student/StudentDashboardScreen';
import { RaiseComplaintScreen } from '../screens/student/RaiseComplaintScreen';
import { MyComplaintsScreen } from '../screens/student/MyComplaintsScreen';
import { ComplaintDetailScreen } from '../screens/student/ComplaintDetailScreen';
import { FeedbackScreen } from '../screens/student/FeedbackScreen';
import { StudentProfileScreen } from '../screens/student/StudentProfileScreen';

const Stack = createNativeStackNavigator<StudentStackParamList>();

export const StudentNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="StudentDashboard"
        component={StudentDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RaiseComplaint"
        component={RaiseComplaintScreen}
        options={{ title: 'Raise Complaint' }}
      />
      <Stack.Screen
        name="MyComplaints"
        component={MyComplaintsScreen}
        options={{ title: 'My Complaints' }}
      />
      <Stack.Screen
        name="ComplaintDetail"
        component={ComplaintDetailScreen}
        options={{ title: 'Complaint Details' }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ title: 'Give Feedback' }}
      />
      <Stack.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
        options={{ title: 'My Profile' }}
      />
    </Stack.Navigator>
  );
};
