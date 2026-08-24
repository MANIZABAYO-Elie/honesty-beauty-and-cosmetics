const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const MONGODB_URI = process.env.MONGODB_URI?.trim();
if (!MONGODB_URI) {
  console.error("Set MONGODB_URI before running this script.");
  process.exit(1);
}

const CategorySchema = new mongoose.Schema(
  { name: { type: String, required: true }, slug: { type: String, required: true, unique: true }, description: String, icon: String },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

const categories = [
  { name: "Skincare",                slug: "skincare",                description: "Cleansers, moisturisers, serums and more." },
  { name: "Makeup",                  slug: "makeup",                  description: "Foundation, lipstick, eyeshadow and more." },
  { name: "Haircare",                slug: "haircare",                description: "Shampoos, conditioners, treatments and more." },
  { name: "Perfumes",                slug: "perfumes",                description: "Fragrances and body mists." },
  { name: "Health and Personal Care", slug: "health-and-personal-care", description: "Vitamins, hygiene and wellness essentials." },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  for (const cat of categories) {
    const result = await Category.updateOne(
      { slug: cat.slug },
      { $setOnInsert: cat },
      { upsert: true }
    );
    if (result.upsertedCount) {
      console.log("Inserted: " + cat.name);
    } else {
      console.log("Already exists: " + cat.name);
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => { console.error(err); process.exit(1); });
