import express from 'express';
import {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    getComplaintStats,
    getStudentStats
} from '../controllers/complaintController.js';
import { auth, adminAuth, studentAuth } from '../middleware/auth.js';

const router = express.Router();

// Student routes
router.post('/', studentAuth, createComplaint);
router.get('/my-complaints', studentAuth, getMyComplaints);
router.get('/student-stats', studentAuth, getStudentStats);

// Admin routes
router.get('/all', adminAuth, getAllComplaints);
router.get('/stats', adminAuth, getComplaintStats);
router.put('/:id/status', adminAuth, updateComplaintStatus);

// Shared routes (both student and admin)
router.get('/:id', auth, getComplaintById);

export default router;
