const express = require('express'),
    passport = require('passport');
const { Course, Instructor } = require('../../models');
// ============================================================================
const router = express.Router();
const validateCreateCourseInput = require('../../validation/createCourse');
// ============================================================================
//@route    POST: /api/courses/create
//@desc     creates the course
//@access   Private && Instructor
router.post('/create',
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
router.get('/createdby/:uid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        const { courses } = await Instructor.findOne({ uid: req.params.uid }).populate('courses');
        if(!courses)
            res.json([]);

        res.json(courses);
    },
);
// ============================================================================
module.exports = router;
