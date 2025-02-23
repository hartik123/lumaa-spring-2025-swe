import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button, Form, Modal, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BackendURLContext } from './Navigation';

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    taskId: "",
    taskDate: "",
    taskTime: "",
    taskDescription: "",
    taskStatus: ""
  });
  const [taskSelectedIndex, setTaskSelectedIndex] = useState(-1);
  const backendURL = useContext(BackendURLContext).backendURL;

  useEffect(() => {
    axios.get(`${backendURL}/api/task/getAll`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        } else {
          alert("Request Failed to get all tasks");
        }
      })
      .catch((error) => {
        alert("Error occurred: " + error.message);
      });
  }, []);

  const handleSave = () => {
    axios.put(`${backendURL}/api/task/update`, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Task updated successfully");
          const { taskId, ...taskWithoutId } = task;
          const updatedTasks = tasks.map((t, index) => index === taskSelectedIndex ? {...taskWithoutId, _id: taskId} : t);
          setTasks(updatedTasks);
          setShow(false);
        } else {
          alert("Task update failed");
        }
      })
      .catch((error) => {
        alert("Error occurred: " + error.message);
      });
  };

  const editTask = async (index, taskDescription, taskDate, taskTime, taskStatus) => {
     setTask({
      ...task,
      taskId: tasks[index]._id,
      taskDate: taskDate,
      taskTime: taskTime,
      taskDescription: taskDescription,
      taskStatus: taskStatus
    });
     setTaskSelectedIndex(index);
    setShow(true);
    console.log(task);
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:8000/api/task/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Task deleted successfully");
          setTasks(tasks.filter((task) => task._id !== taskId));
        } else {
          alert("Task delete failed");
        }
      })
      .catch((error) => {
        alert("Error occurred: " + error.message);
      });
  };

  return (
    <Container>
      <h2 className="text-center mt-4 mb-3">Manage Tasks</h2>
      <Row className="justify-content-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Col md={6} lg={4} key={index} className="mb-3">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-center fw-bold">{task.taskDescription}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {task.taskDate} <br />
                    <strong>Time:</strong> {task.taskTime} <br />
                    <strong>Status:</strong> <span className={`badge bg-${task.taskStatus === 'Completed' ? 'success' : task.taskStatus === 'InProgress' ? 'warning' : 'danger'}`}>{task.taskStatus}</span>
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="warning" onClick={() => editTask(index, task.taskDescription, task.taskDate, task.taskTime, task.taskStatus)}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" onClick={() => deleteTask(task._id)}>
                      <MdDelete />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No tasks available</p>
        )}
      </Row>

      {/* Modal for editing task */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskDate" className="mb-3">
              <Form.Label>Task Date</Form.Label>
              <Form.Control type="date" value={task.taskDate} onChange={(e) => setTask({ ...task, taskDate: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="taskTime" className="mb-3">
              <Form.Label>Task Time</Form.Label>
              <Form.Control type="time" value={task.taskTime} onChange={(e) => setTask({ ...task, taskTime: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="taskDescription" className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={task.taskDescription} onChange={(e) => setTask({ ...task, taskDescription: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="taskStatus" className="mb-3">
              <Form.Label>Task Status</Form.Label>
              <Form.Select value={task.taskStatus} onChange={(e) => setTask({ ...task, taskStatus: e.target.value })}>
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageTask;