const express =require('express');
const generalController =require( "../controllers/generalController");
const { newsletterValidation} =require('../helpers/generalvalidation');
const router = express.Router();


// router.get('/getstack', stackController.fetchstacks);
// router.get('/getstack/:id', getstackValidation,stackController.fetchstack);
// router.get('/deletestack/:id', getstackValidation,stackController.deletestack);
// router.post('/updatestack', updatestackValidation,stackController.updatestack);
router.post('/subscribe', newsletterValidation, generalController.subscribe);

module.exports = router;