import Complaint from '../models/Complaint.js';
// import Feedback from '../models/Feedback.js';

// Create complaint (Student)
export const createComplaint = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const complaint = new Complaint({
            title,
            description,
            category,
            student: req.user._id
        });

        await complaint.save();
        await complaint.populate('student', 'name email enrollmentNumber');

        res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get student's own complaints
export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ student: req.user._id })
            .sort({ createdAt: -1 })
            .populate('student', 'name email enrollmentNumber');

        res.json({ complaints, count: complaints.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all complaints (Admin)
export const getAllComplaints = async (req, res) => {
    try {
        const { category, status } = req.query;
        const filter = {};

        if (category && category !== 'All') {
            filter.category = category;
        }
        if (status && status !== 'All') {
            filter.status = status;
        }

        const complaints = await Complaint.find(filter)
            .sort({ createdAt: -1 })
            .populate('student', 'name email enrollmentNumber department');

        res.json({ complaints, count: complaints.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get complaint by ID
export const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
            .populate('student', 'name email enrollmentNumber department phone');

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Check if student is accessing their own complaint
        if (req.user.role === 'student' && complaint.student._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json({ complaint });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update complaint status (Admin)
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status, adminResponse } = req.body;

        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.status = status;
        if (adminResponse) {
            complaint.adminResponse = adminResponse;
        }

        if (status === 'Resolved') {
            complaint.resolvedAt = new Date();
        }

        await complaint.save();
        await complaint.populate('student', 'name email enrollmentNumber department');

        res.json({
            message: 'Complaint updated successfully',
            complaint
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get complaint statistics (Admin)
export const getComplaintStats = async (req, res) => {
    try {
        const total = await Complaint.countDocuments();
        const pending = await Complaint.countDocuments({ status: 'Pending' });
        const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
        const resolved = await Complaint.countDocuments({ status: 'Resolved' });

        const categoryStats = await Complaint.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            total,
            pending,
            inProgress,
            resolved,
            categoryStats
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get student dashboard stats
export const getStudentStats = async (req, res) => {
    try {
        const total = await Complaint.countDocuments({ student: req.user._id });
        const pending = await Complaint.countDocuments({ student: req.user._id, status: 'Pending' });
        const inProgress = await Complaint.countDocuments({ student: req.user._id, status: 'In Progress' });
        const resolved = await Complaint.countDocuments({ student: req.user._id, status: 'Resolved' });

        res.json({
            total,
            pending,
            inProgress,
            resolved
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
