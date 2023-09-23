import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        markers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Marker'
            }
        ]
    }, 
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);