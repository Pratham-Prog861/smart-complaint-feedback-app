import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/navigation/types';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { complaintService } from '@/services/complaintService';
import { ComplaintCategory } from '@/types';
import { Picker } from '@react-native-picker/picker';

type RaiseComplaintProps = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'RaiseComplaint'>;
};

const categories: ComplaintCategory[] = [
  'Infrastructure',
  'Cleanliness',
  'Faculty',
  'IT',
  'Library',
  'Security',
  'General',
];

export const RaiseComplaintScreen: React.FC<RaiseComplaintProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('General');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await complaintService.createComplaint({
        title: title.trim(),
        description: description.trim(),
        category,
      });

      Alert.alert('Success', 'Complaint submitted successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-6 py-6">
          <View className="rounded-2xl bg-white p-6 shadow-sm">
            <Input
              label="Title *"
              placeholder="Enter complaint title"
              value={title}
              onChangeText={setTitle}
            />

            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Category *</Text>
              <View className="rounded-lg border border-gray-300 bg-white">
                <Picker
                  selectedValue={category}
                  onValueChange={(value) => setCategory(value as ComplaintCategory)}
                  style={{ color: '#000000' }}>
                  {categories.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} color="#000000" />
                  ))}
                </Picker>
              </View>
            </View>

            <Input
              label="Description *"
              placeholder="Enter detailed description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              style={{ minHeight: 120, textAlignVertical: 'top' }}
            />

            <Button title="Submit Complaint" onPress={handleSubmit} loading={loading} />

            <View className="mt-3">
              <Button
                title="Cancel"
                variant="secondary"
                onPress={() => navigation.goBack()}
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
