const express = require('express'),
    passport = require('passport');
const { Course, Instructor, Enroll } = require('../../models');
// ============================================================================
const router = express.Router();
const validateCreateCourseInput = require('../../validation/createCourse');
// ============================================================================
//@route    POST: /api/courses/create
//@desc     creates the course
//@access   Private && Instructor
router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    validateCreateCourseInput,
    async (req, res) => {
        if (req.user.role !== 'Instructor')
            res.status(401).send('Unauthorized');

        let course = req.body;
        const exists = await Course.findOne({ title: course.title });
        if (exists) res.status(400).json({ title: 'Title is already taken!' });

        course.iid = req.user.id;
        let newCourse = new Course(req.body);
        await newCourse.save();
        res.json(newCourse);
    },
);
// ============================================================================
//@route    GET: /api/courses/createdby/uid
//@desc     returns the courses created by the instructor
//@access   Private
router.get(
    '/createdby/:uid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { courses } = await Instructor.findOne({
            uid: req.params.uid,
        }).populate('courses');

        if (!courses) res.status(404).json([]);
        else res.json(courses);
    },
);
// ============================================================================
//@route    GET: /api/courses/cid
//@desc     returns the course specified
//@access   Private
router.get(
    '/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const course = await Course.findById(req.params.cid);

        if (course) res.json(course);
        else res.status(404).json({ course: 'Course not found!' });
    },
);
// ============================================================================
//@route    GET: /api/courses/suggested/:cid
//@desc     returns the list of all courses, sorted by the date created
//@access   Private
router.get(
    '/suggested/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const courses = await Course.find({}, null, { sort: { date: 'desc' } });
        res.json(courses);
    },
);
// ============================================================================
module.exports = router;
