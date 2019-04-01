const express = require('express'),
    passport = require('passport');
const { Student, Course, User } = require('../../models');
// ============================================================================
const router = express.Router();
// ============================================================================
//@route    POST: /api/students/enroll/cid
//@desc     Enrolls a student to a course
//@access   Private && Student
router.post('/enroll/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.user.role !== 'Student')
            res.status(401).send('Unauthorized');
        
        const exists = await Course.findById(req.params.cid);
        if(!exists)
            res.status(400).json({ course: 'Course not found!' });

        let std = {};
        std.cid = exists.id;
        std.uid = req.user.id;
        std = new Student(std);
        std = await std.save();

        var update = {};
        update['$inc'] = {};
        update['$inc']['nStudents'] = 1;
        await Course.findByIdAndUpdate(exists.id, update, { new: true });
        res.json(std);
    }
);
// ============================================================================
//@route    POST: /api/students/enrolledin/cid
//@desc     Returns the students enrolled in the given course
//@access   Private
router.get('/enrolledin/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const {studentIDs} = await Course.findOne({id: req.params.cid}).populate('students', 'uid');

        if(!studentIDs)
            res.status(404).json([]);
        
        let students = [];
        studentIDs.forEach(async ID => students.push(await User.findById(ID)) );
        res.json(students);
    }
);
// ============================================================================
module.exports = router;
