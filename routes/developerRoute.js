const express = require('express');
const path = require('path');
const multer = require('multer');
const { signUpValidation, loginValidation} = require('../helpers/developervalidation');
const developerController = require('../controllers/developerController');
const auth = require('../middleware/developerauth');
const taskController = require("../controllers/taskController");
const subtaskController = require("../controllers/subtaskController");
const {
    gettaskValidation,
    updatetaskValidation,
    taskValidation,
    getsubtaskValidation,
    updatesubtaskValidation,
    subtaskValidation,
    getreportValidation,
    updatereportValidation,
    reportValidation, getstackValidation, updatestackValidation, stackValidation
} = require("../helpers/adminvalidation");
const reportController = require("../controllers/reportController");
const stackController = require("../controllers/adminController");
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

router.post('/register',upload.single('image'),signUpValidation, developerController.register);
router.post('/login',loginValidation, developerController.login);
router.get('/get-developer', auth, developerController.getdeveloper);
router.get('/messages/:userId', auth, developerController.getmessages);
router.get('/taskmessages/:groupId', auth, developerController.getgroupmessages);


router.get('/gettasks', auth, taskController.fetchtasks);
router.get('/gettask/:id', auth, gettaskValidation,taskController.fetchtask);
router.get('/deletestack/:id', auth, gettaskValidation,taskController.deletetask);
router.post('/updatetask', auth, updatetaskValidation,taskController.updatetask);
router.post('/updatetaskprogress', auth, gettaskValidation,taskController.updatetaskprogress);
router.post('/createtask', auth, upload.single("task_image"), taskValidation, taskController.createtask);

router.get('/getsubtasks', auth, subtaskController.fetchtasks);
router.get('/getsubtask/:id', auth, getsubtaskValidation,subtaskController.fetchtask);
router.get('/deletesubstack/:id', auth, getsubtaskValidation,subtaskController.deletetask);
router.post('/updatesubtask', auth, updatesubtaskValidation,subtaskController.updatetask);
router.post('/updatesubtaskprogress', auth, getsubtaskValidation,subtaskController.updatetaskprogress);
router.post('/createsubtask', auth, upload.single("task_image"), subtaskValidation, subtaskController.createtask);

router.get('/getreports', auth, reportController.fetchreports);
router.get('/getreport/:id', auth, getreportValidation,reportController.fetchreport);
router.get('/deletereport/:id', auth, getreportValidation,reportController.deletereport);
router.post('/updatereport', auth, updatereportValidation,reportController.updatereport);
router.post('/createreport', auth, upload.single("report_image"), reportValidation, reportController.createreport);

router.get('/getstack', auth,stackController.fetchstacks);
router.get('/getstack/:id', auth,getstackValidation,stackController.fetchstack);
router.get('/deletestack/:id',auth, getstackValidation,stackController.deletestack);
router.post('/updatestack', auth, updatestackValidation,stackController.updatestack);
router.post('/createstack', auth, upload.single("stackicon"), stackValidation, stackController.createstack);


module.exports = router;