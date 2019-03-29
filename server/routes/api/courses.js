const
    express = require('express'),
    passport = require('passport');
const { Course, Instructor } = require('../../models');
// ============================================================================
const router = express.Router();
const validateCreateCourseInput = require('../../validation/createCourse');
// ============================================================================
//@route    POST: /api/courses/create
//@desc     creates the course
//@access   Private
router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    validateCreateCourseInput,
    async (req, res) => {
        let course = req.body;
        const existing = await Course.findOne({ title: course.title });
        if(existing)
            res.status(400).json({ title: 'Title is already taken!' });

        course.iid = req.user.id;
        let newCourse = new Course(req.body);
        await newCourse.save();
        res.json(newCourse);
    }
);
// ============================================================================
//@route    GET: /api/courses/created
//@desc     returns the courses created by the instructor
//@access   Private
router.get(
    '/created',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        
        // get IDs of created courses
        const courses = await Instructor.findOne({ uid: req.user.id }).populate('courses');

        if(!courses)
            res.json([]);

        //get relevent data of each created course
        let data = [];
        courses.forEach(async courseID => {
            const course = await Course.findOne({ id: courseID });
            data.push(course);
        });
        
        res.json(data);
    }
);
// ============================================================================
module.exports = router;
