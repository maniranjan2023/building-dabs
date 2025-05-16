import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
// import razorpay from "razorpay";

// api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email) {
            return res.json({ success: false, message: "missing details" });
        }
        // validating  email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "user does not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "invalid credential" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to get user profile data

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId).select("-password");

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to update user profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: address, dob, gender }, { new: true });

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });
        }

        res.json({ success: true, message: "Profile updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Fetch doctor data
        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        // Check if the slot is already booked in the appointments collection
        const existingAppointment = await appointmentModel.findOne({ docId, slotDate, slotTime, cancelled: false });

        if (existingAppointment) {
            return res.json({ success: false, message: "Slot already booked. Choose a different time." });
        }

        // Initialize slots_booked object if undefined
        let slots_booked = docData.slots_booked || {};

        // Ensure slots_booked[slotDate] is an array
        if (!Array.isArray(slots_booked[slotDate])) {
            slots_booked[slotDate] = [];
        }

        // Prevent double booking
        if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: "Slot already booked by another user" });
        }

        // Book the slot
        slots_booked[slotDate].push(slotTime);

        // Fetch user data
        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Remove slots_booked from docData to avoid storing it in appointment
        delete docData.slots_booked;

        // Create appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fee,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        console.log("Booking Slot:", slotTime, "on", slotDate);

        // Save the appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update doctor's slots_booked data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked }, { new: true });
        console.log("sb :L ", slots_booked);

        return res.json({ success: true, message: "Appointment Booked" });
    } catch (error) {
        console.error("Error in bookAppointment:", error);
        return res.json({ success: false, message: error.message });
    }
};

// api to get user appointment  from frontend my-appointment page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointment = await appointmentModel.find({ userId });

        res.json({ success: true, appointment });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        console.log("received : ", req.body);

        // Fetch the appointment
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Verify that the user canceling is the owner of the appointment
        if (appointmentData.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        // Mark the appointment as cancelled
        await appointmentModel.findByIdAndUpdate(appointmentId, { $set: { cancelled: true } });

        // Releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        if (!doctorData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        let slots_booked = doctorData.slots_booked || {}; // Ensure slots_booked exists

        // **DEBUGGING STEP**: Log the current slots_booked
        console.log("Before updating slots_booked:", JSON.stringify(slots_booked, null, 2));

        // **Ensure slots_booked is properly structured**
        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }

        // Remove the cancelled slot from the array
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
        console.log("slot booked[slotDate]=", slots_booked[slotDate]);

        // If no slots remain for that date, delete the date entry
        if (slots_booked[slotDate].length === 0) {
            delete slots_booked[slotDate];
        }

        // Update the doctor's slots_booked field
        const updatedDoctor = await doctorModel.findByIdAndUpdate(docId, { slots_booked }, { new: true });

        // **DEBUGGING STEP**: Log the updated slots_booked
        console.log("After updating slots_booked:", JSON.stringify(updatedDoctor.slots_booked, null, 2));

        return res.json({ success: true, message: "Appointment cancelled and slot released" });
    } catch (error) {
        console.error("Error in cancelAppointment:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
};

// const razorpayInstance = new razorpay({
//     key_id: "",
//     key_secret: "",
// });

// // api to make payment of appointmennt

// const paymentRazorpay = async (req, res) => {};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };
