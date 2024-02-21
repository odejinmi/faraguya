import express from 'express'
import path from 'path'
import multer from 'multer'
import { signUpValidation, loginValidation} from '../helpers/validation.js'
import userController from '../controllers/userController.js'
import auth from '../middleware/auth.js'
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

router.post('/register',upload.single('image'),signUpValidation, userController.register);
router.post('/login',loginValidation, userController.login);

router.get('/get-user', auth, userController.getUser);

// module.exports = routers;

export default router;