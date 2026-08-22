import { Schema, model, models } from "mongoose";

export interface IProductImage {
  _id: string;
  image_url: string;
  position: number;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  brand?: string;
  price?: number;
  stock: number;
  sku?: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
  category_id?: string;
  category?: { _id: string; name: string; slug: string };
  product_images: IProductImage[];
  createdAt: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    brand: String,
    price: Number,
    stock: { type: Number, default: 0 },
    sku: String,
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT" },
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    product_images: [{ image_url: String, position: Number }],
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
