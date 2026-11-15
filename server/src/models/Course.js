const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, default: '8 min' },
  type: { type: String, enum: ['video', 'reading', 'quiz'], default: 'video' },
  preview: { type: Boolean, default: false }
});
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: String, description: String, category: String, level: String,
  instructor: String, instructorTitle: String, thumbnail: String, accent: String,
  rating: { type: Number, default: 4.8 }, students: { type: Number, default: 0 },
  price: { type: Number, default: 0 }, featured: { type: Boolean, default: false },
  lessons: [lessonSchema], tags: [String]
}, { timestamps: true });
module.exports = mongoose.model('Course', courseSchema);
