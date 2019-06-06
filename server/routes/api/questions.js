const express = require('express'),
    passport = require('passport');
const { Course, Question, Answer, User } = require('../../models');
// ============================================================================
const router = express.Router();
// ============================================================================
//@route    POST: /api/questions/create
//@desc     Ask a question
//@access   Private
router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const exists = await Course.findById(req.body.cid);
        if (!exists) res.status(400).json({ course: 'Course does not exist!' });

        let q = req.body;
        q.uid = req.user.id;
        q.sno = exists.nQuestions;
        q = new Question(q);
        q = await q.save();

        var update = {};
        update['$inc'] = {};
        update['$inc']['nQuestions'] = 1;
        await Course.findByIdAndUpdate(exists.id, update, { new: true });
        res.json(q);
    },
);
// ============================================================================
//@route    GET: /api/questions/askedin/:cid
//@desc     Get a list of questions asked in the given Course
//@access   Private
router.get(
    '/askedin/:cid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        let { questions } = await Course.findById(req.params.cid).populate(
            'questions',
            null,
            null,
            { sort: { sno: 1 } },
        );

        if (!questions) res.status(404).json([]);

        const result = [];
        for (i = 0; i < questions.length; i++) {
            const user = await User.findById(questions[i].uid).select(
                'name email role profilePic -_id',
            );
            const data = { ...questions[i]._doc };
            data.user = { ...user._doc };
            result.push(data);
        }
        res.json(result);
    },
);
// ============================================================================
//@route    DELETE: /api/questions/:qid
//@desc     Deletes the specified course
//@access   Private && Instructor
router.delete(
    '/:qid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        let question = await Question.findById(req.params.qid).populate('answers');

        if (!question) {
            res.status(404).json({ question: 'Question not found!' });
            return;
        }

        if (toString(question.uid) !== toString(req.user.id)) {
            res.status(404).json({ question: 'Unauthorized action!' });
            return;
        }

        const { answers } = question;
        if (answers) 
            answers.forEach(a => a.remove());
        
        await Question.findByIdAndDelete(question.id);
        res.json(question);
    },
);
// ============================================================================
module.exports = router;
