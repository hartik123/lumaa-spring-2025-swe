import jwt from 'jsonwebtoken';
import userinfoModel from './models/SignUpModel.js';

const VerifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if the Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ success: false, message: "Unauthorized: No token provided" });
        }

        // Extract token from Authorization header
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("USERNAME:", decoded.username);

        // Check if the user exists in the database
        const user = await userinfoModel.findOne({ username: decoded.username }).select("-password");

        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // Attach user information to the request object
        req.user = user; 
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        // Handle any errors during token verification or user retrieval
        console.error(error);
        return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

export default VerifyToken;
