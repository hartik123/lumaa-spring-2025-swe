import userinfoModel from "../models/signUpModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Use bcrypt for password security

const LoginController = async (req, res) => {
    try {        

        console.log("Testing")
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const user = await userinfoModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ ...user.toObject(), token });

    } 
    catch(error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export default LoginController;
