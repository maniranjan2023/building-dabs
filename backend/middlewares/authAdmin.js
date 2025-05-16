import jwt from 'jsonwebtoken'


// admin authentication middleware
  


const authAdmin = async (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }

        // Extract the token from "Bearer <token>"
        const aToken = authHeader.split(" ")[1];
        console.log("Middleware token:", aToken);

        // Verify token
        const token_decode = jwt.verify(aToken, process.env.JWT_SECRET);

        // Ensure decoded token contains expected admin email
        if (token_decode !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        next(); // Proceed to the next middleware
    } 
    catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authAdmin;
