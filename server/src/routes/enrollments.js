const router = require('express').Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
router.use(auth);
router.get('/me', async (req, res, next) => {
  try { res.json(await Enrollment.find({ user: req.user._id }).populate('course').sort({ updatedAt: -1 })); }
  catch (e) { next(e); }
});
router.post('/:courseId', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    const enrollment = await Enrollment.findOneAndUpdate(
      { user: req.user._id, course: course._id }, { $setOnInsert: { user: req.user._id, course: course._id } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(enrollment);
  } catch (e) { next(e); }
});
router.patch('/:courseId/lessons/:lessonId', async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOne({ user: req.user._id, course: req.params.courseId });
    if (!enrollment) return res.status(404).json({ message: 'Enroll in this course first.' });
    const course = await Course.findById(req.params.courseId);
    if (!course || !course.lessons.id(req.params.lessonId)) return res.status(404).json({ message: 'Lesson not found.' });
    const exists = enrollment.completedLessons.some(id => id.toString() === req.params.lessonId);
    if (req.body.completed && !exists) enrollment.completedLessons.push(req.params.lessonId);
    if (!req.body.completed && exists) enrollment.completedLessons = enrollment.completedLessons.filter(id => id.toString() !== req.params.lessonId);
    enrollment.lastLesson = req.params.lessonId;
    await enrollment.save();
    res.json(enrollment);
  } catch (e) { next(e); }
});
module.exports = router;
