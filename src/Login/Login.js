import React, {Component} from 'react';
import './LoginStyle.scss';
import {Link} from "react-router-dom";
import {UserContext} from "../UserContext";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleNameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    login(changeState) {
        if (this.state.username === "" | this.state.password === "") {
            this.setState({loginError: "Please fill in all fields"})
            return;
        }

        var credentials = { username:this.state.username, password:this.state.password };
        fetch('https://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(async (res) => {
                if(res.ok){
                    const token = await res.text();
                    changeState(token);
                    this.props.history.push('/');
                }
                else{
                    this.setState({loginError: await res.text() });
                }
            }).catch((e) => this.setState({loginError: "Could not communicate with server"}));
    }

    render() {
        return (
            <UserContext.Consumer>
                {({user, logoutUser, loginUser}) => {
                    if (user.userId !== 0) this.props.history.push('/');
                    else return (
                        <div className="center">
                            <div className="login-fields">
                                <b className="login-title">Login</b>
                                <label>Username:</label>
                                <input className="login-username-input" type="text" placeholder="Username" value={this.state.username} onChange={this.handleNameChange}></input>
                                <label>Password:</label>
                                <input className="login-username-input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                                <button className="login-submit-button" onClick={(loginUser) => this.login(loginUser)}>Login</button>
                                <b className="login-error">{this.state.loginError}</b>
                                <Link className="to-register-link" to={'/register'}>Don't have an account yet? Register here.</Link>
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}

export default Login;