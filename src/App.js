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

        if (tokenDate === null | localStorage.getItem("token") === null) {
            return {userId: 0, username: "Guest", getToken: function () {return null;}}
        }
        if (today.getDate() - tokenDate.getDate() > 7) {
            localStorage.removeItem("tokenTimestamp");
            localStorage.removeItem("token");
            return {userId: 0, username: "Guest", getToken: function () {return null;}}
        } else {
            localStorage.setItem('date', today);
            return this.getUserInfo();
        }
        return {userId: 0, username: "Guest", getToken: function () {return null;}}
    }

    getUserInfo(){
        return null;
    }

    render() {
      return (
          <UserContext.Provider value={this.state.user}>
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
