const express =require('express');
const path = require('path');
const multer = require('multer');
const stackController =require( "../controllers/adminController");
const developerController =require( "../controllers/developerController");
const taskController =require( "../controllers/taskController");
const reportController =require( "../controllers/reportController");
const { stackValidation, getstackValidation, updatestackValidation,reportValidation, getreportValidation, updatereportValidation,taskValidation, gettaskValidation, updatetaskValidation,signUpValidation,loginValidation} =require('../helpers/adminvalidation');
const router = express.Router();
const auth = require('../middleware/adminauth');
const {getclientkValidation, updateclientValidation, createclientValidation} = require("../helpers/clientvalidation");
const clientController = require("../controllers/clientController");



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

router.post('/register',signUpValidation, stackController.register);
router.post('/login',loginValidation, stackController.login);

router.get('/getstack', auth,stackController.fetchstacks);
router.get('/getstack/:id', auth,getstackValidation,stackController.fetchstack);
router.get('/deletestack/:id',auth, getstackValidation,stackController.deletestack);
router.post('/updatestack', auth, updatestackValidation,stackController.updatestack);
router.post('/createstack', auth, upload.single("stackicon"), stackValidation, stackController.createstack);

router.get('/get-all-developer', auth, developerController.getalldeveloper);
router.post('/register', auth, developerController.register);
router.post('/fetchdeveloper/:id', auth, developerController.fetchdeveloper);

router.get('/gettasks', auth, taskController.fetchtasks);
router.get('/gettask/:id', auth, gettaskValidation,taskController.fetchtask);
router.get('/deletestack/:id', auth, gettaskValidation,taskController.deletetask);
router.post('/updatetask', auth, updatetaskValidation,taskController.updatetask);
router.post('/updatetaskprogress', auth, gettaskValidation,taskController.updatetaskprogress);
router.post('/createtask', auth, upload.single("task_image"), taskValidation, taskController.createtask);

router.get('/getreports', auth, reportController.fetchreports);
router.get('/geteport/:id', auth, getreportValidation,reportController.fetchreport);
router.get('/deletereport/:id', auth, getreportValidation,reportController.deletereport);
router.post('/updatereport', auth, updatereportValidation,reportController.updatereport);
router.post('/createreport', auth, upload.single("report_image"), reportValidation, reportController.createreport);


router.post('/clientregister',createclientValidation, clientController.register);
router.get('/get-client/:id',  getclientkValidation, clientController.fetchclient);
router.get('/get-client',  clientController.getclients);
router.get('/deleteclient/:id',  getclientkValidation, clientController.deleteclient);
router.post('/updateclient',  updateclientValidation, clientController.updateclient);

module.exports = router;