import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './RegisterStyle.scss';
import {UserContext} from "../UserContext";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            passwordRepeat: ""
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepChange = this.handlePasswordRepChange.bind(this);
        this.tryRegistrating = this.tryRegistrating.bind(this);
    }

    tryRegistrating(){
        this.saving = true;

        if (!this.legalInput()) return;

        let user = { username: this.state.username, password: this.state.password };
        fetch(`https://nonograms.nl/api/user/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then( async (res) => {
                if(res.ok){
                    this.setState({username: "", password: "", passwordRepeat: ""});
                    this.props.history.push('/');
                }
                else{
                    const text = await res.text();
                    this.setState({registerError: text });
                }
            }).catch(() => this.setState({loginError: "Could not communicate with server"}));
    }

    legalInput(){
        if (this.state.username.length === "" || this.state.password === "" || this.state.passwordRepeat === "") {
            this.setState({registerError: "Fill in all fields"})
            return false;
        }

        if (this.state.username.length < 4) {
            this.setState({registerError: "Username too short"})
            return false;
        }

        if (this.state.username.length > 32) {
            this.setState({registerError: "Username too long"})
            return false;
        }

        if (this.state.password.length < 6) {
            this.setState({registerError: "Password to short"})
            return false;
        }

        if (this.state.password.length > 64) {
            this.setState({registerError: "Password to long"})
            return false;
        }

        if (this.state.password !== this.state.passwordRepeat) {
            this.setState({registerError: "Passwords do match"})
            return false;
        }
        return true;
    }

    handleNameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handlePasswordRepChange(event){
        this.setState({passwordRepeat: event.target.value});
    }

    render() {
        return (
            <div className="center">
                <div className="register-fields">
                    <b className="register-title">Register:</b>
                    <label>Username:</label>
                    <input className="register-username-input" type="text" placeholder="Username" value={this.state.username} onChange={this.handleNameChange}></input>
                    <label>Password:</label>
                    <input className="register-password-input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <label>Password repeat:</label>
                    <input className="register-password-input" type="password" placeholder="Password repeat" value={this.state.passwordRepeat} onChange={this.handlePasswordRepChange}></input>
                    <button className="register-submit-button" onClick={this.tryRegistrating}>Register</button>
                    <b className="register-error">{this.state.registerError}</b>

                    <Link className="to-login-link" to={'/login'}>Already have an account? Login here.</Link>
                </div>
                <UserContext.Consumer>
                    {({user, logoutUser, loginUser}) => {if (user.userId !== 0) this.props.history.push('/')}}
                </UserContext.Consumer>
            </div>
        );
    }
}

export default Register;