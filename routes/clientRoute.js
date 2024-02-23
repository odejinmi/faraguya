const express = require('express');
const path = require('path');
const multer = require('multer');
const { createclientValidation, getclientkValidation, updateclientValidation} = require('../helpers/clientvalidation');
const clientController = require('../controllers/clientController');
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

router.post('/clientregister',createclientValidation, clientController.register);

router.get('/get-client/:id',  getclientkValidation, clientController.fetchclient);
router.get('/get-client',  clientController.getclients);
router.get('/deleteclient/:id',  getclientkValidation, clientController.deleteclient);
router.post('/updateclient',  updateclientValidation, clientController.updateclient);

module.exports = router;