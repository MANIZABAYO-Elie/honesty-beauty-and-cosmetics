export type Category = {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: string;
};

export type ProductImage = {
  _id: string;
  image_url: string;
  position: number;
};

export type Product = {
  _id: string;
  id: string;
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
  category?: Category | null;
  product_images: ProductImage[];
  createdAt: string;
};

export type ContactMessage = {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  createdAt: string;
};
