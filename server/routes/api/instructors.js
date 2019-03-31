const express = require('express'),
    passport = require('passport');
const { Instructor } = require('../../models');
// ============================================================================
const router = express.Router();
// ============================================================================
//@route    POST: /api/instructors/create
//@desc     creates the instructor profile
//@access   Private && Instructor
router.post('/create', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        if (req.user.role !== 'Instructor')
            res.status(401).send('Unauthorized');

        let inst = {};
        inst.uid = req.user.id;
        inst = new Instructor(inst);
        inst = await inst.save();
        res.json(inst);
    }
);
// ============================================================================
//@route    GET: /api/instructors/id
//@desc     creates the instructor profile
//@access   Private
router.get('/:uid',
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const inst = await Instructor.findOne({ uid: req.params.uid });
        if(!inst)
            res.status(404).json({});
        else
            res.json(inst);
    }
);
// ============================================================================
module.exports = router;
