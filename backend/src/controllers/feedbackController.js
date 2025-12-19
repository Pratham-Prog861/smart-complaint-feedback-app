import Feedback from '../models/Feedback.js';
import Complaint from '../models/Complaint.js';

// Submit feedback (Student - only for resolved complaints)
export const submitFeedback = async (req, res) => {
    try {
        const { complaintId, rating, comment } = req.body;

        // Check if complaint exists and is resolved
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        if (complaint.student.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only give feedback on your own complaints' });
        }

        if (complaint.status !== 'Resolved') {
            return res.status(400).json({ message: 'Feedback can only be submitted for resolved complaints' });
        }

        // Check if feedback already exists
        const existingFeedback = await Feedback.findOne({ complaint: complaintId });
        if (existingFeedback) {
            return res.status(400).json({ message: 'Feedback already submitted for this complaint' });
        }

        const feedback = new Feedback({
            complaint: complaintId,
            student: req.user._id,
            category: complaint.category,
            rating,
            comment
        });

        await feedback.save();

        // Update complaint hasFeedback flag
        complaint.hasFeedback = true;
        await complaint.save();

        await feedback.populate('student', 'name email enrollmentNumber');
        await feedback.populate('complaint', 'title category');

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all feedbacks (Admin)
export const getAllFeedbacks = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};

        if (category && category !== 'All') {
            filter.category = category;
        }

        const feedbacks = await Feedback.find(filter)
            .sort({ createdAt: -1 })
            .populate('student', 'name email enrollmentNumber department')
            .populate('complaint', 'title description category status');

        res.json({ feedbacks, count: feedbacks.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get feedback for a complaint
export const getFeedbackByComplaint = async (req, res) => {
    try {
        const feedback = await Feedback.findOne({ complaint: req.params.complaintId })
            .populate('student', 'name email enrollmentNumber')
            .populate('complaint', 'title category');

        if (!feedback) {
            return res.status(404).json({ message: 'No feedback found for this complaint' });
        }

        res.json({ feedback });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get feedback statistics (Admin)
export const getFeedbackStats = async (req, res) => {
    try {
        const total = await Feedback.countDocuments();

        const avgRating = await Feedback.aggregate([
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' }
                }
            }
        ]);

        const categoryRatings = await Feedback.aggregate([
            {
                $group: {
                    _id: '$category',
                    averageRating: { $avg: '$rating' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const ratingDistribution = await Feedback.aggregate([
            {
                $group: {
                    _id: '$rating',
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            total,
            averageRating: avgRating.length > 0 ? avgRating[0].averageRating : 0,
            categoryRatings,
            ratingDistribution
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
