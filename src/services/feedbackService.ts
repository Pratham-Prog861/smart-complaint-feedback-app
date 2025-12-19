import api from './api';
import { Feedback, CreateFeedbackData, FeedbackStats } from '../types';

export const feedbackService = {
  // Submit feedback (Student)
  submitFeedback: async (
    data: CreateFeedbackData
  ): Promise<{ message: string; feedback: Feedback }> => {
    const response = await api.post<{ message: string; feedback: Feedback }>('/feedback', data);
    return response.data;
  },

  // Get all feedbacks (Admin)
  getAllFeedbacks: async (category?: string): Promise<{ feedbacks: Feedback[]; count: number }> => {
    const params = category && category !== 'All' ? `?category=${category}` : '';
    const response = await api.get<{ feedbacks: Feedback[]; count: number }>(
      `/feedback/all${params}`
    );
    return response.data;
  },

  // Get feedback for a complaint
  getFeedbackByComplaint: async (complaintId: string): Promise<{ feedback: Feedback }> => {
    const response = await api.get<{ feedback: Feedback }>(`/feedback/complaint/${complaintId}`);
    return response.data;
  },

  // Get feedback statistics (Admin)
  getFeedbackStats: async (): Promise<FeedbackStats> => {
    const response = await api.get<FeedbackStats>('/feedback/stats');
    return response.data;
  },
};
