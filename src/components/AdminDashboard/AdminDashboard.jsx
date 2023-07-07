import React from 'react';
import axios from "axios";
import './AdminDashboard.scss';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.email = props.Admin_cred.email;
        this.password = props.Admin_cred.password;
        this.state = {
            users: null,
        };
    }

    componentWillMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        const request = axios.create({
            baseURL: "http://localhost:5000/admin",
            headers: {
                post: {
                    "access-control-allow-origin": "*",
                },
            },
            timeout: 1000,
        });
        request
            .post("/fetchAll", { email: this.email, password: this.password })
            .then((res) => {
                this.setState({ users: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <>
                <h1>Admin Dashboard</h1>
                <hr />
                <div className="users">
                    {this.state.users ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user) => (
                                    <tr onClick={() => { this.viewUser(user) }} key={user.email}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <p>Getting Users...</p>}
                </div>
            </>
        )
    }

    viewUser(user) {
        window.open("/dashboard/" + user.email, "_blank");
    }
}

export default AdminDashboard;