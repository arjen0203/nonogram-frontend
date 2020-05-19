import React, {Component} from 'react';
import './LoginStyle.scss';

class Login extends Component {
    render() {
        return (
            <div className="center">
                <div className="login-fields">
                    <label>Username:</label>
                    <input></input>
                    <label>Password:</label>
                    <input></input>
                    <label>Password repeat:</label>
                    <input></input>
                    <button>Login</button>
                </div>
            </div>
        );
    }
}

export default Login;