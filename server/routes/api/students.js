const express = require('express'),
    passport = require('passport');
const { Student, Course, Enroll, User } = require('../../models');
// ============================================================================
const router = express.Router();
// ============================================================================
//@route    POST: /api/student/enroll/:cid
//@desc     Enrolls a student to the given course
//@access   Private && Student
router.post(
    '/enroll/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.user.role !== 'Student') res.status(401).send('Unauthorized');

        const exists = await Course.findById(req.params.cid);
        if (!exists) res.status(400).json({ course: 'Course not found!' });

        let std = {};
        std.cid = exists.id;
        std.uid = req.user.id;
        std = new Enroll(std);
        std = await std.save();

        var update = {};
        update['$inc'] = {};
        update['$inc']['nStudents'] = 1;
        await Course.findByIdAndUpdate(exists.id, update, { new: true });
        res.json({ success: true });
    },
);
// ============================================================================
//@route    POST: /api/students/enrolledin/cid
//@desc     Returns the students enrolled in the given course
//@access   Private
router.get(
    '/enrolledin/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { studentIDs } = await Course.findOne({
            id: req.params.cid,
        }).populate('students', 'uid');

        if (!studentIDs) res.status(404).json([]);

        let students = [];
        studentIDs.forEach(async ID => students.push(await User.findById(ID)));
        res.json(students);
    },
);
// ============================================================================
module.exports = router;
