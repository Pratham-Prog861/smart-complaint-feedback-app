import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types';

export const authService = {
  // Register student
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove(['token', 'user']);
  },

  // Get current user
  getCurrentUser: async (): Promise<{ user: User }> => {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<{ message: string; user: User }> => {
    const response = await api.put<{ message: string; user: User }>('/auth/profile', data);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  // Get stored token
  getStoredToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem('token');
  },

  // Get stored user
  getStoredUser: async (): Promise<User | null> => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
