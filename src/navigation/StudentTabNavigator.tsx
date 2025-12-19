import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StudentDashboardScreen } from '../screens/student/StudentDashboardScreen';
import { RaiseComplaintScreen } from '../screens/student/RaiseComplaintScreen';
import { MyComplaintsScreen } from '../screens/student/MyComplaintsScreen';
import { ComplaintDetailScreen } from '../screens/student/ComplaintDetailScreen';
import { FeedbackScreen } from '../screens/student/FeedbackScreen';
import { MyFeedbackScreen } from '../screens/student/MyFeedbackScreen';
import { StudentProfileScreen } from '../screens/student/StudentProfileScreen';

const Tab = createBottomTabNavigator();

// Define types for complaint stack
type ComplaintsStackParamList = {
  MyComplaintsMain: undefined;
  ComplaintDetail: { complaintId: string };
  Feedback: { complaintId: string };
};

const ComplaintsStack = createNativeStackNavigator<ComplaintsStackParamList>();

const DashboardStack = createNativeStackNavigator();

// Dashboard Stack
const DashboardStackScreen = () => (
  <DashboardStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#3B82F6' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <DashboardStack.Screen
      name="DashboardMain"
      component={StudentDashboardScreen}
      options={{ headerShown: false }}
    />
  </DashboardStack.Navigator>
);

// Complaints Stack
const ComplaintsStackScreen = () => (
  <ComplaintsStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#3B82F6' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <ComplaintsStack.Screen
      name="MyComplaintsMain"
      component={MyComplaintsScreen}
      options={{ title: 'My Complaints' }}
    />
    <ComplaintsStack.Screen
      name="ComplaintDetail"
      component={ComplaintDetailScreen}
      options={{ title: 'Complaint Details' }}
    />
    <ComplaintsStack.Screen
      name="Feedback"
      component={FeedbackScreen}
      options={{ title: 'Give Feedback' }}
    />
  </ComplaintsStack.Navigator>
);

const RaiseComplaintStack = createNativeStackNavigator();

// Raise Complaint Stack
const RaiseComplaintStackScreen = () => (
  <RaiseComplaintStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#3B82F6' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <RaiseComplaintStack.Screen
      name="RaiseComplaintMain"
      component={RaiseComplaintScreen}
      options={{ title: 'Raise Complaint' }}
    />
  </RaiseComplaintStack.Navigator>
);

// Define types for feedback stack
type FeedbackStackParamList = {
  MyFeedbackMain: undefined;
  ComplaintDetail: { complaintId: string };
  Feedback: { complaintId: string };
};

const FeedbackStack = createNativeStackNavigator<FeedbackStackParamList>();

// Feedback Stack
const FeedbackStackScreen = () => (
  <FeedbackStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#3B82F6' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <FeedbackStack.Screen
      name="MyFeedbackMain"
      component={MyFeedbackScreen}
      options={{ title: 'Give Feedback' }}
    />
    <FeedbackStack.Screen
      name="ComplaintDetail"
      component={ComplaintDetailScreen}
      options={{ title: 'Complaint Details' }}
    />
    <FeedbackStack.Screen
      name="Feedback"
      component={FeedbackScreen}
      options={{ title: 'Give Feedback' }}
    />
  </FeedbackStack.Navigator>
);

const ProfileStack = createNativeStackNavigator();

// Profile Stack
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#3B82F6' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
    <ProfileStack.Screen
      name="ProfileMain"
      component={StudentProfileScreen}
      options={{ title: 'My Profile' }}
    />
  </ProfileStack.Navigator>
);

export const StudentTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
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
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Complaints"
        component={ComplaintsStackScreen}
        options={{
          tabBarLabel: 'Complaints',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="list" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="RaiseComplaint"
        component={RaiseComplaintStackScreen}
        options={{
          tabBarLabel: 'New',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle" size={size + 4} color={color} />
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
