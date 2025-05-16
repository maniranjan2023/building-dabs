import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import appointmentModel from "../models/appointmentModel.js";
dotenv.config();

// API for adding doctors
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fee, address } = req.body;
    const imageFile = req.file;

    // Check if all required fields are provided
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    console.log(address)

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUrl = null;

    // Upload image to Cloudinary (if file exists)
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // Parse address if it's a string
    let parsedAddress;
    try {
      parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
    } catch (error) {
      return res.json({ success: false, message: "Invalid address format. Must be valid JSON." });
    }

    // Create doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: parsedAddress,
      date: Date.now(),
    };
   

    // Save to database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding new doctor:", error);
    return res.json({ success: false, message: "There was an error adding a new doctor" });
  }
};


// api for admin login
const loginAdmin = async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        console.log("Received:", email, password);
        console.log("Stored:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    
        // Ensure environment variables are loaded
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
          return res.status(500).json({ success: false, message: "Server configuration error" });
        }
    
        // Check credentials (trim to remove unwanted spaces)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          
          // Correct JWT format (payload should be an object)
          const token = jwt.sign(
             email ,  // ✅ Payload should be an object
            process.env.JWT_SECRET,
             
          );
    
          console.log("Generated Token:", token);
          return res.status(200).json({ success: true, token });
        }
    
        return res.status(401).json({ success: false, message: "Invalid Credentials" });
      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
}

// api to get all doctors list for admin panel
const allDoctors = async (req , res)=>{
     try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})

      
     } 
     
     catch (error) {
         console.log(error)
         res.json({success:false, message:error.message})
     }

}

// api to get all appointment list
const appointmentAdmin=async(req,res)=>{
  try {
    const appointment= await appointmentModel.find({})
    res.json({success:true, appointment})
 
  } 
  
  catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    
  }
}















export { addDoctor,loginAdmin ,allDoctors,appointmentAdmin};
