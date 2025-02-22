import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
    username: {type: String},
    password: {type:String}
});

const userinfoModel = mongoose.models.User || mongoose.model("User", userInfoSchema);

export default userinfoModel;