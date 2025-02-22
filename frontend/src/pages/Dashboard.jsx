import axios from 'axios';
import React, { useEffect } from 'react';
import ManageTask from '../components/ManageTask';
import CreateTask from '../components/CreateTask';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Dashboard = () => {
    const [viewTasks, setViewTasks] = React.useState("tab1");
    const [task, setTask] = React.useState({
        taskDate: "",
        taskTime: "",
        taskDescription: "",
        taskStatus: "pending"
    });

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            <Navigate to="/login" />
        }
    }, []);

    return (
        <div className="container mt-4">
            {/* Tabs */}
            <div className="d-flex justify-content-center mb-4">
                <button
                    onClick={() => setViewTasks("tab1")}
                    className={`btn ${viewTasks === "tab1" ? "btn-primary" : "btn-light"} me-2`}
                    style={{ width: "200px" }}
                >
                    Manage Task
                </button>
                <button
                    onClick={() => setViewTasks("tab2")}
                    className={`btn ${viewTasks === "tab2" ? "btn-primary" : "btn-light"}`}
                    style={{ width: "200px" }}
                >
                    Create Task
                </button>
            </div>

            {/* Tab Content */}
            <div className="border p-4 rounded shadow-sm" style={{ minHeight: "60vh" }}>
                {viewTasks === "tab1" ? <ManageTask /> : <CreateTask />}
            </div>
        </div>
    );
};

export default Dashboard;
