export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  enrollmentNumber?: string;
  department?: string;
  semester?: number;
  isActive?: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  enrollmentNumber?: string;
  department?: string;
  semester?: number;
}

export type ComplaintCategory =
  | 'Infrastructure'
  | 'Cleanliness'
  | 'Faculty'
  | 'IT'
  | 'Library'
  | 'Security'
  | 'General';

export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  student: User;
  adminResponse?: string;
  resolvedAt?: string;
  hasFeedback: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComplaintData {
  title: string;
  description: string;
  category: ComplaintCategory;
}

export interface UpdateComplaintData {
  status: ComplaintStatus;
  adminResponse?: string;
}

export interface Feedback {
  _id: string;
  complaint: string | Complaint;
  student: User;
  category: ComplaintCategory;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackData {
  complaintId: string;
  rating: number;
  comment: string;
}

export interface ComplaintStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  categoryStats?: Array<{ _id: string; count: number }>;
}

export interface FeedbackStats {
  total: number;
  averageRating: number;
  categoryRatings: Array<{ _id: string; averageRating: number; count: number }>;
  ratingDistribution: Array<{ _id: number; count: number }>;
}
