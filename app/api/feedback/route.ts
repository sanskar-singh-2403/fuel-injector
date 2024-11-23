import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  vehicleModel: String,
  issueType: [String],
  description: String,
  satisfaction: Number,
  recommend: Boolean,
  additionalComments: String,
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb+srv://sanskarsinghty1234:MZ9zvdJQB6Bq3Cro@cluster0.z8eun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  await Feedback.create(body);

  return NextResponse.json({ message: 'Feedback Submitted!' });
}
