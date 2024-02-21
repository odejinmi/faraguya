import express from 'express'
dotenv.config();
import dotenv from "dotenv";
import stackController from "../controllers/stackController.js";
import { stackValidation} from '../helpers/validation.js'
const router = express.Router();


router.get('/getstack', stackController.fetchstacks);
router.get('/getstack/:id', stackController.fetchstack);
router.put('/getstack/:id', stackController.updatestack);
router.post('/createstack', stackValidation, stackController.createstack);

// module.exports = routers;

export default router;