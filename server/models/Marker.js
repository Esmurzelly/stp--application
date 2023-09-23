import mongoose from "mongoose";

const MarkerSchema = new mongoose.Schema(
    {
        markerName: {type: String},
        category: {type: String},
        description: {type: String},
        position: {
            type: [Number],
            index: '2dsphere',
        }
        // username: {type: String},
        // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

export default mongoose.model('Marker', MarkerSchema);