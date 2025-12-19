// const express = require('express');
// const router = express.Router();
// const {
//     submitFeedback,
//     getAllFeedbacks,
//     getFeedbackByComplaint,
//     getFeedbackStats
// } = require('../controllers/feedbackController');
// const { adminAuth, studentAuth } = require('../middleware/auth');
import express from 'express';
import {
    submitFeedback,
    getAllFeedbacks,
    getFeedbackByComplaint,
    getFeedbackStats
} from '../controllers/feedbackController.js';
import { adminAuth, studentAuth } from '../middleware/auth.js';

const router = express.Router();

// Student routes
router.post('/', studentAuth, submitFeedback);

// Admin routes
router.get('/all', adminAuth, getAllFeedbacks);
router.get('/stats', adminAuth, getFeedbackStats);
router.get('/complaint/:complaintId', adminAuth, getFeedbackByComplaint);

export default router;
