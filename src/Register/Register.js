import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Register extends Component {
    render() {
        return (
            <div className="center">
                <div className="register-fields">
                    <b className="register-title">Register:</b>
                    <label>Username:</label>
                    <input type="text" placeholder="Username"></input>
                    <label>Password:</label>
                    <input type="password" placeholder="Password"></input>
                    <label>Password repeat:</label>
                    <input type="password" placeholder="Password repeat"></input>
                    <button>Register</button>

                    <Link to={'/login'} >Already have an account? Login here.</Link>
                </div>
            </div>
        );
    }
}

export default Register;