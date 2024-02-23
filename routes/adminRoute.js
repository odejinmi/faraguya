const express =require('express');
const stackController =require( "../controllers/adminController");
const { stackValidation, getstackValidation, updatestackValidation} =require('../helpers/adminvalidation');
const router = express.Router();


router.get('/getstack', stackController.fetchstacks);
router.get('/getstack/:id', getstackValidation,stackController.fetchstack);
router.get('/deletestack/:id', getstackValidation,stackController.deletestack);
router.post('/updatestack', updatestackValidation,stackController.updatestack);
router.post('/createstack', stackValidation, stackController.createstack);

module.exports = router;