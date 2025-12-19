import User from '../models/User.js';

// Get all students (Admin)
export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({ students, count: students.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get student by ID (Admin)
export const getStudentById = async (req, res) => {
    try {
        const student = await User.findById(req.params.id).select('-password');

        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Toggle student active status (Admin)
export const toggleStudentStatus = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);

        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.isActive = !student.isActive;
        await student.save();

        res.json({
            message: `Student ${student.isActive ? 'activated' : 'deactivated'} successfully`,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                isActive: student.isActive
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete student (Admin)
export const deleteStudent = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);

        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: 'Student not found' });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
