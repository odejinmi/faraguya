const {check} = require('express-validator');


exports.newsletterValidation = [
    check('email', 'Email is required').not().isEmpty(),
];