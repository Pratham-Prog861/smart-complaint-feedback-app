import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AllComplaintsScreen } from '../screens/admin/AllComplaintsScreen';
import { AdminComplaintDetailScreen } from '../screens/admin/AdminComplaintDetailScreen';
import { ViewFeedbackScreen } from '../screens/admin/ViewFeedbackScreen';
import { ManageUsersScreen } from '../screens/admin/ManageUsersScreen';
import { AdminProfileScreen } from '../screens/admin/AdminProfileScreen';

const Tab = createBottomTabNavigator();

// Define types for complaint stack
type ComplaintsStackParamList = {
  AllComplaintsMain: undefined;
  AdminComplaintDetail: { complaintId: string };
};

const DashboardStack = createNativeStackNavigator();
const ComplaintsStack = createNativeStackNavigator<ComplaintsStackParamList>();
const FeedbackStack = createNativeStackNavigator();
const UsersStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Dashboard Stack
const DashboardStackScreen = () => (
  <DashboardStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#9333EA' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <DashboardStack.Screen
      name="DashboardMain"
      component={AdminDashboardScreen}
      options={{ headerShown: false }}
    />
  </DashboardStack.Navigator>
);

// Complaints Stack
const ComplaintsStackScreen = () => (
  <ComplaintsStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#9333EA' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <ComplaintsStack.Screen
      name="AllComplaintsMain"
      component={AllComplaintsScreen}
      options={{ title: 'All Complaints' }}
    />
    <ComplaintsStack.Screen
      name="AdminComplaintDetail"
      component={AdminComplaintDetailScreen}
      options={{ title: 'Complaint Details' }}
    />
  </ComplaintsStack.Navigator>
);

// Feedback Stack
const FeedbackStackScreen = () => (
  <FeedbackStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#9333EA' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <FeedbackStack.Screen
      name="ViewFeedbackMain"
      component={ViewFeedbackScreen}
      options={{ title: 'Student Feedback' }}
    />
  </FeedbackStack.Navigator>
);

// Users Stack
const UsersStackScreen = () => (
  <UsersStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#9333EA' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <UsersStack.Screen
      name="ManageUsersMain"
      component={ManageUsersScreen}
      options={{ title: 'Manage Students' }}
    />
  </UsersStack.Navigator>
);

// Profile Stack
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#9333EA' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <ProfileStack.Screen
      name="ProfileMain"
      component={AdminProfileScreen}
      options={{ title: 'My Profile' }}
    />
  </ProfileStack.Navigator>
);

export const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#9333EA',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Complaints"
        component={ComplaintsStackScreen}
        options={{
          tabBarLabel: 'Complaints',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={FeedbackStackScreen}
        options={{
          tabBarLabel: 'Feedback',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="feedback" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersStackScreen}
        options={{
          tabBarLabel: 'Students',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
