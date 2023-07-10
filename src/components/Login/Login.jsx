import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Login.scss'

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.logged = false;
        this.state = {
            loggedIn: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.LoginReq = this.LoginReq.bind(this);
    }

    LoginReq(state) {
        console.log("Post Request");
        const request = axios.create({
            baseURL: "http://localhost:5000/user",
            headers: {
                post: {
                    "access-control-allow-origin": "*",
                },
            },
        });

        request
            .post("/login", { email: this.email, password: this.password })
            .then(function (response) {
                console.log(response);
                state.setState({ loggedIn: true });
            })
            .catch(function (error) {
                alert("Invalid email or password");
                window.location.reload();
                console.log(error);
            });
    }

    handleLogin(email, password) {
        this.email = email;
        this.password = password;
        this.LoginReq(this);
    }

    render() {
        return (
            <>
                <div className="Login">
                    {this.state.loggedIn ? (
                        window.open("/dashboard/" + this.email, "_self")
                    ) : (
                        <>
                            <div className="login-container" >
                                <div className='login-page'>
                                    <h2 className='pageTitle'>
                                        Login
                                    </h2>
                                </div>
                                <label className='label-text'>
                                    Email:
                                    <input
                                        type="email"
                                        className="login-input"
                                        placeholder="Email"
                                        id='email'
                                    />
                                </label>
                                <label className='label-text'>
                                    Password:
                                    <input
                                        type="password"
                                        className="login-input"
                                        id='pass'
                                        placeholder="Password"
                                    />
                                </label>
                                <button className='login-btn' type="submit" onClick={() => {
                                    const email = document.getElementById("email").value;
                                    const password = document.getElementById("pass").value;
                                    this.handleLogin(email, password);
                                }}>Login</button>
                                <p className='reg'>{"Didn't have an account?"}</p>
                                <button className='reg-btn'
                                    onClick={() => {
                                        window.open("/register", "_self");
                                    }}>Create an account</button>
                            </div>
                        </>
                    )}
                </div >
            </>
        )
    }
}

export default withParams(Login);