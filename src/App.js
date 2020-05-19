import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Creating from './Creating/Creating.js';
import Solving from './Solving/Solving.js';
import Login from "./Login/Login";
import Register from "./Register/Register";
import './GlobalStyle.scss'

function App() {
  return (
      <Router className="router">
          <nav>
              <ul className="router-list">
                  <li><Link to={'/solving/100'}>Solving</Link></li>
                  <li><Link to={'/creating'} >Creating</Link></li>
                  <li className="login-button"><Link to={'/login'} >Login</Link></li>
              </ul>
          </nav>
          <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/creating' component={Creating} />
              <Route exact path='/solving/:id' component={Solving} />
          </Switch>
      </Router>
  );
}

export default App;
