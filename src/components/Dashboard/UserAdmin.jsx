import React from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import Charts from "./Charts";
import TaskList from "../TaskList/TaskList";
import './UserAdmin.scss'

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class UserDashAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: null,
        };
    }

    componentWillMount() {
        this.email = this.props.params.user;
        console.log(this.email);
        this.renderMyData();
    }

    renderMyData() {
        const request = axios.create({
            baseURL: "http://localhost:5000/user",
            headers: {
                post: {
                    "access-control-allow-origin": "*",
                },
            },
            timeout: 10000,
        });
        request
            .post("/tasks", { email: this.email })
            .then((res) => {
                this.setState({ tasks: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    createNewTask(Email) {
        const title = prompt("Enter task title");
        const description = prompt("Enter task description");
        const dueDate = prompt("Enter task due date");
        const status = "Incomplete";
        const email = Email;

        // verify whether all fields are filled
        if (title === "" || description === "" || dueDate === "") {
            alert("Please fill all the required  fields!");
            return;
        }

        const newTask = {
            'title': title,
            'description': description,
            'due': dueDate,
            'status': status,
            'email': email
        }

        const request = axios.create({
            baseURL: "http://localhost:5000/user",
            headers: {
                post: {
                    "access-control-allow-origin": "*",
                },
            },
            timeout: 10000,
        });

        request.post('/addtask', { 'email': email, 'task': newTask }).then((res) => {
            console.log(res);
            alert("Task created successfully!");
        }).catch((err) => {
            console.log(err);
            alert("Task not created!");
        });
    }

    render() {
        return (
            <>
                <div className="charts">
                    {this.state.tasks ? (
                        <Charts tasks={this.state.tasks} />
                    ) : (
                        <p>Getting Charts...</p>
                    )}
                </div>
                <div className="tasks">
                    <br />
                    <hr />
                    {this.state.tasks ? (
                        <TaskList tasks={this.state.tasks} email={this.email} />
                    ) : (
                        <p>Getting Tasks...</p>
                    )}
                </div>
                <div className="create-task">
                    <button className="createTask-btn" onClick={() => { this.createNewTask(this.email) }} >{"Create New Task"}</button>
                </div>
            </>
        );
    }
}

export default withParams(UserDashAdmin);