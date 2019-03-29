const express = require('express');
const router = express.Router();
// ============================================================================
//@route    GET: /student/dashboard
//@desc     return the courses of
//@access   Public
router.get('/', (req, res) => {
    res.json(req.user);
});
// ============================================================================
module.exports = router;
