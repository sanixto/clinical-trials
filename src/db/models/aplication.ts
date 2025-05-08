import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
  age: number;
  zip: string;
  conditions: string[];
  location: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  privacyPolicy: boolean;
  recieveEmail?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    age: { type: Number, required: true },
    zip: { type: String, required: true },
    conditions: { type: [String], required: true },
    location: { type: String, required: true },
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    phoneNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    privacyPolicy: { type: Boolean, required: true },
    recieveEmail: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>("Application", applicationSchema);

export default Application;
