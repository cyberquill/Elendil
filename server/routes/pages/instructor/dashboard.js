const 
    express = require('express'),
    passport = require('passport');
const { Course } = require('../../../models');
const router = express.Router();
// ============================================================================
//@route    GET: /instructor/dashboard
//@desc     returns the courses created by the instructor
//@access   Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // get created courses
        
    },
);
// ============================================================================
module.exports = router;
