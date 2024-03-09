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

exports.reportValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('reporter_id', 'Reporter id is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('report_id', 'report_id is required').not().isEmpty(),
    check('sent_to', 'sent_to is required').not().isEmpty(),
    check('date', 'date is required').not().isEmpty(),
    check('status', 'status is required').not().isEmpty(),
    // check('image').custome( (value, {reg}) =>{
    //     if (req.file.mimetype === 'image/jpeg' || reg.file.mimetype === 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload an image type PNG, JPG')
];

exports.getreportValidation = [
    check('id', 'Id is required').not().isEmpty(),
];
exports.updatereportValidation = [
    check('id', 'Id is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('reporter_id', 'Reporter id is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('report_id', 'report_id is required').not().isEmpty(),
    check('sent_to', 'sent_to is required').not().isEmpty(),
    check('date', 'date is required').not().isEmpty(),
    check('status', 'status is required').not().isEmpty(),
    // check('stackicon').custome( (value, {req}) =>{
    //     if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload an image type PNG, JPG')
];

exports.taskValidation = [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('developers', 'Developers is required').not().isEmpty(),
    check('start_date', 'start_date is required').not().isEmpty(),
    check('due_date', 'due_date is required').not().isEmpty(),
    check('available', 'available is required').not().isEmpty(),
    // check('image').custome( (value, {reg}) =>{
    //     if (req.file.mimetype === 'image/jpeg' || reg.file.mimetype === 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload an image type PNG, JPG')
];

exports.gettaskValidation = [
    check('id', 'Id is required').not().isEmpty(),
];
exports.updatetaskValidation = [
    check('id', 'Id is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('developers', 'Developers is required').not().isEmpty(),
    check('start_date', 'start_date is required').not().isEmpty(),
    check('due_date', 'due_date is required').not().isEmpty(),
    check('available', 'available is required').not().isEmpty(),
    // check('stackicon').custome( (value, {req}) =>{
    //     if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }).withMessage('Please upload an image type PNG, JPG')
];