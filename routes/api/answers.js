const express = require('express'),
    passport = require('passport');
const { Question, Answer, User } = require('../../models');
// ============================================================================
const router = express.Router();
// ============================================================================
//@route    POST: /api/answers/create
//@desc     Post an answer
//@access   Private
router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const exists = await Question.findById(req.body.qid);
        if (!exists)
            res.status(400).json({ question: 'Question does not exist!' });

        let a = req.body;
        a.uid = req.user.id;
        a.sno = exists.nAnswers;
        a = new Answer(a);
        a = await a.save();

        const update = {};
        update['$inc'] = {};
        update['$inc']['nAnswers'] = 1;
        await Question.findByIdAndUpdate(exists.id, update, { new: true });
        res.json(a);
    },
);
// ============================================================================
//@route    POST: /api/answers/of/qid
//@desc     Get a list of all answers for a given question.
//@access   Private
router.get(
    '/of/:qid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { answers } = await Question.findById(req.params.qid).populate(
            'answers',
            null,
            null,
            { sort: { sno: 1 } },
        );

        if (!answers) res.status(404).json([]);

        const result = [];
        for (i = 0; i < answers.length; i++) {
            const user = await User.findById(answers[i].uid).select(
                'name email role profilePic -_id',
            );
            const data = { ...answers[i]._doc };
            data.user = { ...user._doc };
            result.push(data);
        }
        res.json(result);
    },
);
// ============================================================================
//@route    DELETE: /api/answers/:aid
//@desc     Deletes the specified course
//@access   Private && Instructor
router.delete(
    '/:aid',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        
        let answer = await Answer.findById(req.params.aid);

        if (!answer) {
            res.status(404).json({ answer: 'Answer not found!' });
            return;
        }

        if (toString(answer.uid) !== toString(req.user.id)) {
            res.status(404).json({ answer: 'Unauthorized action!' });
            return;
        }

        await Answer.findByIdAndDelete(answer.id);
        res.json(answer);
    },
);
// ============================================================================
module.exports = router;
