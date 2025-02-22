import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    taskDate: {
        type: String,
        required: true
    },
    taskTime: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        required: true
    }
});

const TaskModel = mongoose.model("task", TaskSchema);

export default TaskModel;