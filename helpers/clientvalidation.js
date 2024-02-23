const {check} = require('express-validator');

exports.createclientValidation = [
    check('stack', 'Stack is required').not().isEmpty(),
    check('years_of_experience', 'Years of experience is required').not().isEmpty(),
    check('hourly_budget', 'Hourly budget is required').not().isEmpty(),
    check('monthly_budget', 'Monthly budget is required').not().isEmpty(),
    check('call_date', 'Call date is required').not().isEmpty(),
    check('phonenumber', 'Phone Number is required').not().isEmpty(),
    check('workemail', 'Email is required').not().isEmpty(),
    check('workemail', 'please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
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

exports.getclientkValidation = [
    check('id', 'Id is required').not().isEmpty(),
];
exports.updateclientValidation = [
    check('id', 'Id is required').not().isEmpty(),
    check('stack', 'Stack is required').not().isEmpty(),
    check('years_of_experience', 'Years of experience is required').not().isEmpty(),
    check('hourly_budget', 'Hourly budget is required').not().isEmpty(),
    check('monthly_budget', 'Monthly budget is required').not().isEmpty(),
    check('call_date', 'Call date is required').not().isEmpty(),
    check('phonenumber', 'Phone Number is required').not().isEmpty(),
    check('workemail', 'Email is required').not().isEmpty(),
    check('workemail', 'please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password min 6 length').isLength({min:6}),

];