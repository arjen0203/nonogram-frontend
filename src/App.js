import React from 'react';
import GlobalStyle from './GlobalStyle.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Creating from './Creating/Creating.js';
import Solving from './Solving/Solving.js';

function App() {
  return (
      <Router className={GlobalStyle}>
          <nav>
            <ul>
              <li><Link to={'/solving'}>Solving</Link></li>
              <li><Link to={'/creating'} >Creating</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/creating' component={Creating} />
            <Route exact path='/solving/:id' component={Solving} />
          </Switch>
      </Router>
  );
}

export default App;
