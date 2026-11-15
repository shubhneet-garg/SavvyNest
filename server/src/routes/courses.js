const router = require('express').Router();
const Course = require('../models/Course');
router.get('/', async (req, res, next) => {
  try {
    const { q, category, level, sort } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (level && level !== 'All') filter.level = level;
    if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { instructor: { $regex: q, $options: 'i' } }, { tags: { $regex: q, $options: 'i' } }];
    const sortBy = sort === 'rating' ? { rating: -1 } : sort === 'newest' ? { createdAt: -1 } : { featured: -1, students: -1 };
    res.json(await Course.find(filter).sort(sortBy));
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ message: 'Course not found.' }); res.json(course); }
  catch (e) { next(e); }
});
module.exports = router;
