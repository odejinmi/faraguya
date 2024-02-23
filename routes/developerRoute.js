const express = require('express');
const path = require('path');
const multer = require('multer');
const { signUpValidation, loginValidation} = require('../helpers/developervalidation');
const developerController = require('../controllers/developerController');
const auth = require('../middleware/developerauth');
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

module.exports = router;