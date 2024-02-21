import express from 'express'
import path from 'path'
import multer from 'multer'
import { createcompanyValidation, loginValidation} from '../helpers/validation.js'
import companyController from '../controllers/companyController.js'
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

router.post('/companyregister',createcompanyValidation, companyController.register);

router.get('/get-company/:id',  companyController.fetchcompany);
router.get('/get-company',  companyController.getUser);

// module.exports = routers;

export default router;