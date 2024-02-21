import {check} from 'express-validator'
// const { check} = require('express-validator');

export const signUpValidation = [
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

export const loginValidation = [
    check('email', "Please enter a valid mail").isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password', 'Password min 6 length').isLength({min:6}),
];

export const stackValidation = [
    check('name', 'Name is required').not().isEmpty(),
];

export const forgetValidation = [
    check('email', 'Please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
];

export const createcompanyValidation = [
    check('stack', 'Stack is required').not().isEmpty(),
    check('yearsofexperience', 'Years of experience is required').not().isEmpty(),
    check('hourlybudget', 'Hourly budget is required').not().isEmpty(),
    check('monthlybudget', 'Monthly budget is required').not().isEmpty(),
    check('calldate', 'Call date is required').not().isEmpty(),
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