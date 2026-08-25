import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  writer: { type: String, required: true },
  readingTime: { type: String, required: true },
  content: { type: String, required: true },
  bannerImage: { type: String, required: true },
  // NEW FIELDS FOR SEO:
  metaTitle: { type: String, required: false },
  metaDescription: { type: String, required: false },
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
