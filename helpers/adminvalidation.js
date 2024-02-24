const {check} = require('express-validator');


exports.stackValidation = [
    check('name', 'Name is required').not().isEmpty(),
    // check('image').custome( (value, {reg}) =>{
    //     if (req.file.mimetype === 'image/jpeg' || reg.file.mimetype === 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload an image type PNG, JPG')
];

exports.getstackValidation = [
    check('id', 'Id is required').not().isEmpty(),
];
exports.updatestackValidation = [
    check('id', 'Id is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    // check('stackicon').custome( (value, {req}) =>{
    //     if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload an image type PNG, JPG')
];