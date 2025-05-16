import jwt from 'jsonwebtoken'


// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }

        // Extract the token from "Bearer <token>"
        const Token = authHeader.split(" ")[1];
        console.log("Middleware token:", Token);
        if(!Token){
            return res.json({success:false, message:'not authenticate login again'})
        }

        // Verify token
        const token_decode = jwt.verify(Token, process.env.JWT_SECRET);

        

        req.body.userId = token_decode.id;


        next(); // Proceed to the next middleware
    } 
    catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;
