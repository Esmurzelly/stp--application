import mongoose from 'mongoose';

const MarkerSchema = new mongoose.Schema(
  {
    category: { type: String },
    description: { type: String },
    position: {
      type: [Number],
      index: '2dsphere',
    },
    metres: { type: Number },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
      type: String,
      default: '',
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('Marker', MarkerSchema);
