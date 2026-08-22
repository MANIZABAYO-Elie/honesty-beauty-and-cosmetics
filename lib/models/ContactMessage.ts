import { Schema, model, models } from "mongoose";

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  createdAt: string;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: { type: String, required: true },
    is_read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.ContactMessage || model("ContactMessage", ContactMessageSchema);
