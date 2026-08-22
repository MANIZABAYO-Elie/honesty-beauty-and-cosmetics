const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://manizabayoelie_db_user:3BnbFN76W2NivOAp@honesty-beauty-and-cosm.73b89ti.mongodb.net/honesty-beauty?appName=honesty-beauty-and-cosmetics-ltd-2026";

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
