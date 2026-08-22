import mongoose, { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

const CategorySchema = new Schema<ICategory>(
  { name: { type: String, required: true }, slug: { type: String, required: true, unique: true }, description: String, icon: String },
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);
