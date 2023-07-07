import React from 'react';
import axios from 'axios';
import './Register.scss'


function RegisterReq() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;
    const request = axios.create({
        baseURL: 'http://localhost:5000/user',
        headers: {
            post: {
                "access-control-allow-origin": "*",
            }
        },
    });

    if (password !== cpass) {
        alert("Passwords does not match");
        return;
    } else {
        const user = {
            'name': name,
            'email': email,
            'password': password
        }

        request.post('/register', user)
            .then((res) => {
                console.log(res);
                alert("Registered Successfully");
            }).catch((err) => {
                console.log(err);
                alert("Registration Failed");
                window.location.reload();
            });
    }
}

function checkValidation() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;

    if (name === '' || email === '' || password === '' || cpass === '') {
        alert('Please fill the required fields');
        return false;
    } else if (password !== cpass) {
        alert('Password do not match');
        return false;
    } else {
        RegisterReq();
    }
}
function Register() {
    return (
        <>
            <div className="register-container">
                <div className='register-page'>
                    <h2 className='pageTitle'>
                        Register
                    </h2>
                </div>
                <label className='label-text'>
                    Name:
                    <input
                        type="text"
                        className="register-input"
                        placeholder="Name"
                        id='name'
                    />
                </label>
                <label className='label-text'>
                    Email:
                    <input
                        type="email"
                        className="register-input"
                        placeholder="Email"
                        id='email'
                    />
                </label>
                <label className='label-text'>
                    Password:
                    <input
                        type="password"
                        className="register-input"
                        placeholder="Password"
                        id='pass'
                    />
                </label>
                <label className='label-text'>
                    Confirm Password:
                    <input
                        type="password"
                        className="register-input"
                        placeholder="Confirm Password"
                        id='cpass'
                    />
                </label>
                <button className='register-btn' type="submit" onClick={checkValidation}> Register</button>
                <button className='reg-btn'
                    onClick={() => {
                        window.open("/login", "_self");
                    }}>Sign In</button>
            </div >
        </>
    );

};

export default Register;
