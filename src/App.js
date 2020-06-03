import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Creating from './Creating/Creating.js';
import Solving from './Solving/Solving.js';
import Login from "./Login/Login";
import Register from "./Register/Register";
import './GlobalStyle.scss';
import {UserContext} from './UserContext';
import Searching from "./Searching/Searching";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {userId: 0, username: "Guest", getToken: function () {return null;}}
        }

        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    async componentDidMount() {
        let user = await this.getUserContext();
        this.setState({user});
    }

    async getUserContext() {
        const tokenDate = new Date(localStorage.getItem("tokenTimestamp"));
        const today = new Date();

        const GuestUser = {userId: 0, username: "Guest", getToken: function () {return null;}};

        if (tokenDate === null | localStorage.getItem("token") === null) {
            return GuestUser;
        }
        if (today.getDate() - tokenDate.getDate() > 7) {
            localStorage.removeItem("tokenTimestamp");
            localStorage.removeItem("token");
            return GuestUser;
        } else {
            localStorage.setItem('tokenTimestamp', today);
            let user
            user = await this.getUserInfo();
            if (user !== null) return user;
        }
        return GuestUser;
    }

    async getUserInfo() {
        let user;
        await fetch('https://nonograms.nl/api/user/profile', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}
        })
            .then(res => {
                if (!res.ok) throw new Error(res.text());
                return res.json();
            })
            .then(data => {
                user = {userId: data.id, username: data.username, getToken: function () {return localStorage.getItem("token")}};
            }).catch(error => {
            console.error('Could not get user', error);
            return null;
        });
        return user;
    }

    async loginUser(token) {
        const today = new Date();
        await localStorage.setItem("token", token);
        await localStorage.setItem("tokenTimestamp", today.toString());
        await this.setState({user: this.getUserInfo()});
    }

    async logoutUser() {
        await localStorage.removeItem("token");
        await localStorage.removeItem("tokenTimestamp")
        let user = await this.getUserContext();
        this.setState( {user});
    }


    render() {
        const value = {
            user: this.state.user,
            logoutUser: this.logoutUser,
            loginUser: this.loginUser
        }

      return (
          <UserContext.Provider value={value}>
              <Router className="router">
                  <nav>
                      <ul className="router-list">
                          <li><Link to={'/solving'}>Solving</Link></li>
                          {this.state.user.userId !== 0 ? (<li><Link to={'/creating'}>Creating</Link></li>) : (<li></li>)}
                          {this.state.user.userId !== 0 ? (<li className="login-button"><div className="logout-button" onClick={this.logoutUser}>Logout</div></li>) : <li className="login-button"><Link to={'/login'}>Login</Link></li>}
                      </ul>
                  </nav>
                  <Switch>
                      <Route exact path='/login' component={Login}/>
                      <Route exact path='/register' component={Register}/>
                      <Route exact path='/creating' component={Creating}/>
                      <Route exact path='/solving' component={Searching}/>
                      <Route exact path='/solving/:id' component={Solving}/>
                      <Route path='/' component={Searching}/>
                  </Switch>
              </Router>
          </UserContext.Provider>
      );
  }
}

export default App;
