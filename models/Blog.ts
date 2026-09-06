import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  writer: { type: String, required: true },
  readingTime: { type: String, required: true },
  content: { type: String, required: true },
  bannerImage: { type: String, required: true },
  
  // SEO FIELDS:
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },       // ✅ ADDED
  schemaMarkup: { type: String, default: '' },       // ✅ ADDED
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
