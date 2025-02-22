import userinfoModel from "../models/SignUpModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltRounds = 10; // Higher is more secure but slower
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const SignUpController = async (req, res) =>{
    try{
        const {username:username, password:password} = req.body
        const hashedPassword = await hashPassword(password);
        const user = new userinfoModel({
            username: username,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({
            username: username,
        },process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(201).json({ username: username, token }); 
    }
    catch(error){
        console.log(error);
        res.send({error: error.message});
    }
}

export default SignUpController;