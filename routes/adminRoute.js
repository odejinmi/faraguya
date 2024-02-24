const express =require('express');
const path = require('path');
const multer = require('multer');
const stackController =require( "../controllers/adminController");
const { stackValidation, getstackValidation, updatestackValidation} =require('../helpers/adminvalidation');
const router = express.Router();


const storage = multer.diskStorage(
    {
        destination:function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/images'));
        },
        filename: function (req, file, cb) {
            const name = Date.now()+'-'+file.originalname;
            cb(null, name);
        }
    }
);

const filefilter = (req, file, cb) => {
    (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')?
        cb(null, true):cb(null,false);
};

const upload = multer({
    storage:storage,
    fileFilter:filefilter
});

router.get('/getstack', stackController.fetchstacks);
router.get('/getstack/:id', getstackValidation,stackController.fetchstack);
router.get('/deletestack/:id', getstackValidation,stackController.deletestack);
router.post('/updatestack', updatestackValidation,stackController.updatestack);
router.post('/createstack', upload.single("stackicon"), stackController.createstack);

module.exports = router;