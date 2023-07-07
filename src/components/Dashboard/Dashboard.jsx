import React from "react";
import axios from "axios";
import Charts from "./Charts";
import TaskList from '../TaskList/TaskList';
import './Dashboard.scss';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.email = props.user.email;
        this.state = {
            tasks: null,
        };
    }

    componentWillMount() {
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
        request.post("/tasks", { email: this.email }).then((res) => {
            this.setState({ tasks: res.data });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <>
                <div className="Charts-part">
                    {this.state.tasks ? (
                        <Charts tasks={this.state.tasks} />
                    ) : (
                        <p className="text">Getting Charts...</p>
                    )}
                </div>
                <div className="Tasks-part">
                    <br />
                    <hr className="page-divider" />
                    {this.state.tasks ? (
                        <TaskList tasks={this.state.tasks} email={this.email} />
                    ) : (
                        <p className="text">Getting Tasks...</p>
                    )}
                </div>
            </>
        );
    }
}
