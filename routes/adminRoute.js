const express =require('express');
const path = require('path');
const multer = require('multer');
const stackController =require( "../controllers/adminController");
const developerController =require( "../controllers/developerController");
const taskController =require( "../controllers/taskController");
const reportController =require( "../controllers/reportController");
const { stackValidation, getstackValidation, updatestackValidation,reportValidation, getreportValidation, updatereportValidation,taskValidation, gettaskValidation, updatetaskValidation} =require('../helpers/adminvalidation');
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
router.post('/createstack', upload.single("stackicon"), stackValidation, stackController.createstack);
router.get('/get-all-developer', developerController.getalldeveloper);
router.get('/gettasks', taskController.fetchtasks);
router.get('/gettask/:id', gettaskValidation,taskController.fetchtask);
router.get('/deletestack/:id', gettaskValidation,taskController.deletetask);
router.post('/updatetask', updatetaskValidation,taskController.updatetask);
router.post('/updatetaskprogress', gettaskValidation,taskController.updatetaskprogress);
router.post('/createtask', upload.single("task_image"), taskValidation, taskController.createtask);
router.get('/getreports', reportController.fetchreports);
router.get('/geteport/:id', getreportValidation,reportController.fetchreport);
router.get('/deletereport/:id', getreportValidation,reportController.deletereport);
router.post('/updatereport', updatereportValidation,reportController.updatereport);
router.post('/createreport', upload.single("report_image"), reportValidation, reportController.createreport);

module.exports = router;