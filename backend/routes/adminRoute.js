import express from 'express'

import upload from '../middlewares/multer.js'
import { addDoctor , allDoctors, loginAdmin , appointmentAdmin} from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin,upload.single('image') ,addDoctor),
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors', authAdmin,allDoctors)
adminRouter.post('/change-availability', authAdmin,changeAvailablity)
adminRouter.get('/appointment',authAdmin, appointmentAdmin)


export default adminRouter