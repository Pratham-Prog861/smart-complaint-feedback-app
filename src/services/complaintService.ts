import api from './api';
import { Complaint, CreateComplaintData, UpdateComplaintData, ComplaintStats } from '../types';

export const complaintService = {
  // Create complaint (Student)
  createComplaint: async (
    data: CreateComplaintData
  ): Promise<{ message: string; complaint: Complaint }> => {
    const response = await api.post<{ message: string; complaint: Complaint }>('/complaints', data);
    return response.data;
  },

  // Get student's own complaints
  getMyComplaints: async (): Promise<{ complaints: Complaint[]; count: number }> => {
    const response = await api.get<{ complaints: Complaint[]; count: number }>(
      '/complaints/my-complaints'
    );
    return response.data;
  },

  // Get student stats
  getStudentStats: async (): Promise<ComplaintStats> => {
    const response = await api.get<ComplaintStats>('/complaints/student-stats');
    return response.data;
  },

  // Get all complaints (Admin)
  getAllComplaints: async (
    category?: string,
    status?: string
  ): Promise<{ complaints: Complaint[]; count: number }> => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (status && status !== 'All') params.append('status', status);

    const response = await api.get<{ complaints: Complaint[]; count: number }>(
      `/complaints/all?${params.toString()}`
    );
    return response.data;
  },

  // Get complaint by ID
  getComplaintById: async (id: string): Promise<{ complaint: Complaint }> => {
    const response = await api.get<{ complaint: Complaint }>(`/complaints/${id}`);
    return response.data;
  },

  // Update complaint status (Admin)
  updateComplaintStatus: async (
    id: string,
    data: UpdateComplaintData
  ): Promise<{ message: string; complaint: Complaint }> => {
    const response = await api.put<{ message: string; complaint: Complaint }>(
      `/complaints/${id}/status`,
      data
    );
    return response.data;
  },

  // Get complaint statistics (Admin)
  getComplaintStats: async (): Promise<ComplaintStats> => {
    const response = await api.get<ComplaintStats>('/complaints/stats');
    return response.data;
  },
};
