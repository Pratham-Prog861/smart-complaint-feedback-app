import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Infrastructure', 'Cleanliness', 'Faculty', 'IT', 'Library', 'Security', 'General']
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminResponse: {
        type: String,
        default: ''
    },
    resolvedAt: {
        type: Date
    },
    hasFeedback: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Complaint', complaintSchema);
