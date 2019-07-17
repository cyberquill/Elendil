const express = require('express'),
    passport = require('passport');
const { Course, Instructor, Enroll, User } = require('../../models');
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
        const { courses } = await Instructor.findOne({ uid: req.params.uid })
            .populate('courses', null, null, { sort: { date: -1 } })
            .lean();

        if (!courses) {
            res.status(404).json([]);
            return;
        }

        const result = [];
        for (i = 0; i < courses.length; i++) {
            const Inst = await User.findById(courses[i].iid)
                .select('name email profilePic -_id')
                .lean();
            const data = courses[i];
            data.instructor = Inst;
            result.push(data);
        }
        res.json(result);
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

        if (!course) res.status(404).json({ course: 'Course not found!' });

        res.json(course);
    },
);
// ============================================================================
//@route    GET: /api/courses/suggested/:uid
//@desc     returns the list of all courses, sorted by the date created
//@access   Private
router.get(
    '/suggested/:uid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const courses = await Course.find({}).lean();

        if (!courses) {
            res.status(404).json([]);
            return;
        }

        const result = [];
        for (i = 0; i < courses.length; i++) {
            const Inst = await User.findById(courses[i].iid)
                .select('name email profilePic -_id')
                .lean();
            courses[i].instructor = Inst;
            result.push(courses[i]);
        }
        res.json(result);
    },
);
// ============================================================================
//@route    DELETE: /api/courses/:cid
//@desc     Deletes the specified course
//@access   Private && Instructor
router.delete(
    '/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        let course = await Course.findById(req.params.cid);
        
        if (!course) {
            res.status(404).json({ course: 'Course not found!' });
            return;
        }

        if (toString(course.iid) !== toString(req.user.id)) {
            res.status(404).json({ course: 'Unauthorized action!' });
            return;
        }

        await Course.findByIdAndDelete(course.id);
        res.json(course);
    },
);
// ============================================================================
module.exports = router;
