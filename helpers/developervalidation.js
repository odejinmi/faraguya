const {check} = require('express-validator');

exports.signUpValidation = [
    check('firstname', 'First Name is required').not().isEmpty(),
    check('lastname', 'Last Name is required').not().isEmpty(),
    check('phonenumber', 'Phone Number is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password min 6 length').isLength({min:6}),
    // check('image').custome( (value, {reg}) =>{
    //     if (req.file.mimetype === 'image/jpeg' || reg.file.mimetype === 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload an image type PNG, JPG')
];

exports.loginValidation = [
    check('email', "Please enter a valid mail").isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password', 'Password min 6 length').isLength({min:6}),
];

exports.forgetValidation = [
    check('email', 'Please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
];