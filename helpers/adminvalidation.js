const {check} = require('express-validator');


exports.stackValidation = [
    check('name', 'Name is required').not().isEmpty(),
];

exports.getstackValidation = [
    check('id', 'Id is required').not().isEmpty(),
];
exports.updatestackValidation = [
    check('id', 'Id is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
];