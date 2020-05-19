import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './RegisterStyle.scss';

class Register extends Component {
    render() {
        return (
            <div className="center">
                <div className="register-fields">
                    <b className="register-title">Register:</b>
                    <label>Username:</label>
                    <input className="register-username-input" type="text" placeholder=" Username"></input>
                    <label>Password:</label>
                    <input className="register-password-input" type="password" placeholder=" Password"></input>
                    <label>Password repeat:</label>
                    <input className="register-password-input" type="password" placeholder=" Password repeat"></input>
                    <button className="register-submit-button">Register</button>

                    <Link className="to-login-link" to={'/login'}>Already have an account? Login here.</Link>
                </div>
            </div>
        );
    }
}

export default Register;