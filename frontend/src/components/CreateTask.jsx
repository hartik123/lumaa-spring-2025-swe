import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BackendURLContext } from './Navigation';

const CreateTask = () => {
    const [task, setTask] = useState({
        taskDate: "",
        taskTime: "23:59",
        taskDescription: "",
        taskStatus: "Pending"
    });
    const backendURL = useContext(BackendURLContext).backendURL;


    const submitForm = () => {
        axios.post(`${backendURL}/api/task/create`, task, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                res.status === 201 ? alert("Task created successfully!") : alert("Task not created");
            })
            .catch((error) => {
                console.error(error);
                alert("Task creation failed");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Create Task</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="taskDate" className="form-label">Task Date & Time:</label>
                                    <input
                                        type="datetime-local"
                                        id="taskDate"
                                        className="form-control"
                                        onChange={(e) => setTask({ ...task, taskDate: e.target.value })}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="taskDescription" className="form-label">Task Description:</label>
                                    <input
                                        type="text"
                                        id="taskDescription"
                                        name="taskDescription"
                                        className="form-control"
                                        onChange={(e) => setTask({ ...task, taskDescription: e.target.value })}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Task Status:</label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-select"
                                        onChange={(e) => setTask({ ...task, taskStatus: e.target.value })}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="InProgress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={submitForm}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
