const express = require('express'),
    passport = require('passport');
const { Course, Lecture } = require('../../models');
// ============================================================================
const router = express.Router();
// ============================================================================
//@route    POST: /api/lectures/create
//@desc     Create a lecture in a course
//@access   Private && Instructor
router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        if (req.user.role !== 'Instructor')
            res.status(401).send('Unauthorized');

        const exists = await Course.findById(req.body.cid);
        if (!exists)
            res.status(400).json({ lecture: 'Course does not exist!' });

        let lecture = req.body;
        lecture.linkID = lecture.link.slice(32);
        lecture.sno = exists.nLectures;
        lecture = new Lecture(lecture);
        lecture = await lecture.save();

        var update = {};
        update['$inc'] = {};
        update['$inc']['nLectures'] = 1;
        await Course.findByIdAndUpdate(exists.id, update, { new: true });
        res.json(lecture);
    },
);
// ============================================================================
//@route    GET: /api/lectures/of/cid
//@desc     Lectures of the given Course
//@access   Private
router.get(
    '/of/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        // get IDs of lectures:
        const { lectures } = await Course.findById(req.params.cid).populate(
            'lectures',
        );

        if (!lectures) res.status(404).json([]);

        res.json(lectures);
    },
);
// ============================================================================
//@route    GET: /api/lectures/single/lid
//@desc     fetches the specified lecture
//@access   Private
router.get(
    '/single/:lid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const lecture = Lecture.findById(req.params.lid);

        if (lecture) res.json(lecture);
        else res.status(404).json({ lecture: 'Lecture not found!' });
    },
);
// ============================================================================
//@route    DELETE: /api/lectures/:lid
//@desc     Deletes the specified lecture
//@access   Private && Instructor
router.delete(
    '/:lid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        let lecture = await Lecture.findById(req.params.lid);

        if (!lecture) {
            res.status(404).json({ lecture: 'Lecture not found!' });
            return;
        }

        const course = await Course.findById(lecture.cid);

        if (toString(course.iid) !== toString(req.user.id)) {
            res.status(404).json({ lecture: 'Unauthorized action!' });
            return;
        }

        await Lecture.findByIdAndDelete(lecture.id);
        res.json(lecture);
    },
);
// ============================================================================
module.exports = router;
