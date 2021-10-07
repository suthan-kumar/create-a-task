import React, { useEffect, useState } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import Axios from "../api/Axios";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("incomplete");

  const getTasks = async () => {
    try {
      const { data } = await Axios.get("task");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isValidForm = () => {
    return name && deadline && priority && status;
  };

  const handleReset = () => {
    setName("");
    setDeadline("");
    setPriority("low");
    setStatus("incomplete");
  };

  const createTask = async (task) => {
    try {
      const { data } = await Axios.post("task", task);
      setTasks([...tasks, data]);
      handleReset();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    if (isValidForm()) {
      const task = { name, deadline, priority, status };
      createTask(task);
    }
  };

  useEffect(() => {
    handleClose();
    handleReset();
    getTasks();
  }, []);
  return (
    <>
      <Card className="my-4 p-4">
        <Row>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleOpen}>
              Create a Task
            </button>
          </div>
          {tasks.map((task) => (
            <Col key={task._id} md={4}>
              <Card className="m-2 p-2">
                <h5>{task.name}</h5>
                <p>{task.priority}</p>
                <p>{task.deadline}</p>
                <p>{task.status}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Task Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label>Priority</label>
          <select
            className="form-control"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            className="form-control"
            placeholder="Deadline"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
