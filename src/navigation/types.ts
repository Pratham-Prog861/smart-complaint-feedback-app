export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

export type StudentStackParamList = {
  StudentDashboard: undefined;
  RaiseComplaint: undefined;
  MyComplaints: undefined;
  ComplaintDetail: { complaintId: string };
  Feedback: { complaintId: string };
  MyFeedback: undefined;
  StudentProfile: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  AllComplaints: undefined;
  AdminComplaintDetail: { complaintId: string };
  ViewFeedback: undefined;
  ManageUsers: undefined;
  AdminProfile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Student: undefined;
  Admin: undefined;
};
