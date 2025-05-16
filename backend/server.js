import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
//app configure
const app = express()
const port = process.env.PORT || 4000


// middlewares
app.use(express.json());
app.use(cors());
connectDb()
connectCloudinary()

// api endpoint
app.use('/api/admin',adminRouter)  //localhost:4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user' , userRouter)

 app.get('/',(req,res)=>{
    res.send('api is working')
 })

 app.listen(port,()=>
   
    console.log('server started',port))


