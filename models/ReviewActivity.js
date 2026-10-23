import mongoose from 'mongoose';

const ReviewActivitySchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['VISIT', 'DRAFT_GENERATED', 'COPIED', 'GOOGLE_REDIRECT'],
      required: true,
    },
    servicesSelected: {
      type: [String],
      default: [],
    },
    sentiment: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ReviewActivity || mongoose.model('ReviewActivity', ReviewActivitySchema);
