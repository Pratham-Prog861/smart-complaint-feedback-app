import api from './api';
import { User } from '../types';

export const userService = {
  // Get all students (Admin)
  getAllStudents: async (): Promise<{ students: User[]; count: number }> => {
    const response = await api.get<{ students: User[]; count: number }>('/users/students');
    return response.data;
  },

  // Get student by ID (Admin)
  getStudentById: async (id: string): Promise<{ student: User }> => {
    const response = await api.get<{ student: User }>(`/users/students/${id}`);
    return response.data;
  },

  // Toggle student status (Admin)
  toggleStudentStatus: async (id: string): Promise<{ message: string; student: User }> => {
    const response = await api.put<{ message: string; student: User }>(
      `/users/students/${id}/toggle-status`
    );
    return response.data;
  },

  // Delete student (Admin)
  deleteStudent: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/users/students/${id}`);
    return response.data;
  },
};
