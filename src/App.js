import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Creating from './Creating/Creating.js';
import Solving from './Solving/Solving.js';
import Login from "./Login/Login";
import Register from "./Register/Register";
import './GlobalStyle.scss';
import {UserContext} from './UserContext';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.getUserContext()
        }
    }

    getUserContext() {
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
            localStorage.setItem('date', today);
            let user = this.getUserInfo();
            if (user === null) return GuestUser;
        }
        return GuestUser;
    }

    async getUserInfo() {
        let user;
        await fetch('https://localhost:8080/api/user/me', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}
        })
            .then( async res => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(data => {
                user = {userId: this.data.id, username: this.data.username, getToken: function () {return localStorage.getItem("token")}};
            }).catch(error => {
            console.error('Couldnt get user', error);
            return null;
        });
        return user;
    }

    async loginUser(token) {
        await localStorage.setItem("token");
        this.setState({user: this.getUserInfo()});
    }

    logoutUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenTimestamp")
        this.setState( {user: this.getUserInfo()});
    }


    render() {
        const value = {
            user: this.state.user,
            logoutUser: this.logoutUser(),
            loginUser: this.loginUser()
        }

      return (
          <UserContext.Provider value={value}>
              <Router className="router">
                  <nav>
                      <ul className="router-list">
                          <li><Link to={'/solving/1'}>Solving</Link></li>
                          <li><Link to={'/creating'}>Creating</Link></li>
                          <li className="login-button"><Link to={'/login'}>Login</Link></li>
                      </ul>
                  </nav>
                  <Switch>
                      <Route exact path='/login' component={Login}/>
                      <Route exact path='/register' component={Register}/>
                      <Route exact path='/creating' component={Creating}/>
                      <Route exact path='/solving/:id' component={Solving}/>
                  </Switch>
              </Router>
          </UserContext.Provider>
      );
  }
}

export default App;
