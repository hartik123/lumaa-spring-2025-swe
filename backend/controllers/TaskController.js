import TaskModel from "../models/TaskModel.js";
import jwt from 'jsonwebtoken';

const CreateTaskController = async (req, res) => {

    try {
        console.log(req.body)
        const {taskDate, taskTime, taskDescription, taskStatus } = req.body;
        if (!taskDate || !taskTime || !taskDescription || !taskStatus) {
            res.status(404).send("Please fill all the fields");
            throw new Error("Please fill all the fields");
        }
        const newTask = new TaskModel({
            username: req.user.username,
            taskDate: taskDate,
            taskTime: taskTime,
            taskDescription: taskDescription,
            taskStatus: taskStatus
        });
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
}

const GetTaskController = async (req, res) => {
    try {
        const tasks = await TaskModel.find({username: req.user.username});
        if (tasks) {
            res.status(200).send(tasks);
        } else {
            res.status(404).send("No task found");
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message });
    }
}

const UpdateTaskController = async (req, res) => {
    const {taskDate, taskTime, taskDescription, taskStatus } = req.body;
    if (!taskDate || !taskTime || !taskDescription || !taskStatus) {
        res.status(404).send("Please fill all the fields");
        throw new Error("Please fill all the fields");
    }
    try {
        const task = await TaskModel.findOneAndUpdate({username: req.user.username, _id: req.body.taskId}, {
            taskDate: taskDate,
            taskTime: taskTime,
            taskDescription: taskDescription,
            taskStatus: taskStatus
        }, {new: true});
        if (task) {
            res.status(200).send(task);
        } else {
            res.status(404).send("Task not found");
        }
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
}

const DeleteTaskController = async (req, res) => {
    try {
        const task = await TaskModel.findOneAndDelete({username: req.user.username, _id: req.params.taskId});
        if (task) {
            res.status(200).send(task);
        } else {
            res.status(404).send("Task not found");
        }
    }
    catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
}


export { CreateTaskController, GetTaskController, UpdateTaskController, DeleteTaskController };