import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  suggestedKeywords: { type: [String], default: [] },
});

const CustomQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    googleReviewUrl: {
      type: String,
      default: '',
      trim: true,
    },
    businessCategory: {
      type: String,
      default: 'Professional Services',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    welcomeHeadline: {
      type: String,
      default: 'How was your experience with us?',
    },
    instructions: {
      type: String,
      default: 'Select what we helped you with today. We will help you draft an authentic review you can easily copy and post on Google.',
    },
    services: {
      type: [ServiceSchema],
      default: [],
    },
    customQuestions: {
      type: [CustomQuestionSchema],
      default: [],
    },
    stats: {
      totalVisits: { type: Number, default: 0 },
      draftsGenerated: { type: Number, default: 0 },
      reviewsCopied: { type: Number, default: 0 },
      googleClicks: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
