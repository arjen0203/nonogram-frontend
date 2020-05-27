import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './RegisterStyle.scss';

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

        let user = { username: this.state.username, password: this.state.password };
        console.log(JSON.stringify(user));
        fetch(`http://localhost:8080/api/user/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => {
                if(!res.ok){
                    this.setState({ ...this.state, registerError: "Something went wrong while registrating"});
                    this.saving = false;
                    return Promise.reject("Promise rejected")
                }
                //res.json()
            })
            .then(data => {
                this.props.history.push("/");
                this.saving = false;
            })
            .catch(this.setState({ ...this.state, registerError: "Something went wrong while registrating"}));
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
                    <input className="register-username-input" type="text" placeholder=" Username" value={this.state.username} onChange={this.handleNameChange}></input>
                    <label>Password:</label>
                    <input className="register-password-input" type="password" placeholder=" Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <label>Password repeat:</label>
                    <input className="register-password-input" type="password" placeholder=" Password repeat" value={this.state.passwordRepeat} onChange={this.handlePasswordRepChange}></input>
                    <button className="register-submit-button" onClick={this.tryRegistrating}>Register</button>

                    <Link className="to-login-link" to={'/login'}>Already have an account? Login here.</Link>
                </div>
            </div>
        );
    }
}

export default Register;