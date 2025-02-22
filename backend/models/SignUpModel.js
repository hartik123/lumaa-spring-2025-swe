import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
    username: {type: String},
    password: {type:String}
});

const userinfoModel = mongoose.model("user", userInfoSchema);

export default userinfoModel;