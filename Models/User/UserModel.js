import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    _id: { type: String },
    user_name: { type: String, required: true },
    user_dob: { type: String, required: true },
    user_email: { type: String, required: true, unique: true },
    user_number: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    normal_password: { type: String },
    user_type: { type: String },
    user_goal: { type: String },
    count: { type: Number }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('user_password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.user_password = await bcrypt.hash(this.user_password, salt);
    if (!this._id) {
        this._id = this.user_email; // Ensure _id is set to user_email
    }
    next();
});

export default mongoose.model('User', UserSchema);
