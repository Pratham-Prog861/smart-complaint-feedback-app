import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    enrollmentNumber: '',
    department: '',
    semester: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword, enrollmentNumber, department, semester } =
      formData;

    if (!name || !email || !password || !enrollmentNumber || !department || !semester) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting registration with:', {
        name,
        email,
        enrollmentNumber,
        department,
        semester: parseInt(semester),
      });
      await register({
        name,
        email: email.toLowerCase(),
        password,
        phone: formData.phone,
        enrollmentNumber,
        department,
        semester: parseInt(semester),
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred during registration';
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <ScrollView className="flex-1">
        <View className="px-6 py-10">
          <View className="mb-8 items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/50">
              <Text className="text-4xl">🎓</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
            <Text className="mt-2 text-base text-gray-600">Join as a Student</Text>
          </View>

          <View className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200">
            <Input
              label="Full Name *"
              placeholder="John Doe"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
            />

            <Input
              label="Email Address *"
              placeholder="john.doe@university.edu"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label="Enrollment Number *"
              placeholder="e.g., 2305101020015"
              value={formData.enrollmentNumber}
              onChangeText={(value) => updateField('enrollmentNumber', value)}
            />

            <Input
              label="Department *"
              placeholder="e.g., Computer Science"
              value={formData.department}
              onChangeText={(value) => updateField('department', value)}
            />

            <Input
              label="Semester *"
              placeholder="1-8"
              value={formData.semester}
              onChangeText={(value) => updateField('semester', value)}
              keyboardType="numeric"
            />

            <Input
              label="Phone Number (Optional)"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              keyboardType="phone-pad"
            />

            <Input
              label="Password *"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              secureTextEntry
            />

            <Input
              label="Confirm Password *"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateField('confirmPassword', value)}
              secureTextEntry
            />

            <View className="mt-2">
              <Button title="Create Account" onPress={handleRegister} loading={loading} />
            </View>

            <View className="mt-8 items-center border-t border-gray-100 pt-6">
              <Text className="mb-4 text-sm text-gray-600">Already have an account?</Text>
              <Button
                title="Sign In"
                variant="secondary"
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
