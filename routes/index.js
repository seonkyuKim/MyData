var router = require('express').Router();

router.use('/users', require('./users'));
// router.use('/profiles', require('./profiles'));
// router.use('/articles', require('./articles'));
// router.use('/tags', require('./tags'));



module.exports = router;