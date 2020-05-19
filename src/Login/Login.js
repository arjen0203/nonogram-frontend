import React, {Component} from 'react';
import './LoginStyle.scss';
import {Link} from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <div className="center">
                <div className="login-fields">
                    <b className="login-title">Login</b>
                    <label>Username:</label>
                    <input type="text" placeholder="Username"></input>
                    <label>Password:</label>
                    <input type="password" placeholder="Password"></input>
                    <button>Login</button>

                    <Link to={'/register'} >Don't have an account yet? Register here.</Link>
                </div>
            </div>
        );
    }
}

export default Login;