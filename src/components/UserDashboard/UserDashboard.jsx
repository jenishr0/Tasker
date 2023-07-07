import React from "react";
import { Link, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import Dashboard from '../Dashboard/Dashboard'

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        };
    }

    componentWillMount() {
        this.email = this.props.params.user;
        this.name = this.props.params.name;
    }

    render() {
        return (
            <>
                <div className="UserDash">
                    <div className="navbar">
                        <ul>
                            <li className="title">Tasker</li>
                            <li className="profile">
                                <Link to="/">Profile</Link>
                            </li>
                            <li className="Dashboard">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Routes>
                    <Route path="/profile" element={<UserProfile name={this.name} email={this.email} />} />
                    <Route path='/dashboard' element={<Dashboard user={{ email: this.email }} />} />
                </Routes>
            </>
        );
    }
}
export default withParams(UserDashboard);