import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@paruluniversity.ac.in' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = new User({
            name: 'Admin',
            email: 'admin@paruluniversity.ac.in',
            password: hashedPassword,
            role: 'admin',
            isActive: true
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@paruluniversity.ac.in');
        console.log('🔑 Password: admin123');
        console.log('\n⚠️  Please change this password after first login in production!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createAdmin();
