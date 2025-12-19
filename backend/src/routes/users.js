// const express = require('express');
// const router = express.Router();
// const {
//     getAllStudents,
//     getStudentById,
//     toggleStudentStatus,
//     deleteStudent
// } = require('../controllers/userController');
// const { adminAuth } = require('../middleware/auth');
import express from 'express';
import {
    getAllStudents,
    getStudentById,
    toggleStudentStatus,
    deleteStudent
} from '../controllers/userController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Admin routes for managing students
router.get('/students', adminAuth, getAllStudents);
router.get('/students/:id', adminAuth, getStudentById);
router.put('/students/:id/toggle-status', adminAuth, toggleStudentStatus);
router.delete('/students/:id', adminAuth, deleteStudent);

export default router;
