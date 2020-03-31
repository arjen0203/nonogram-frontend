import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Creating from '/creating.js';
import Solving from '/solving.js';

class NavBar extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>Welcome to React Router Tutorial</h2>
                    <nav>
                        <ul>
                            <li><Link to={'/solving'}>Solving</Link></li>
                            <li><Link to={'/creating'} >Creating</Link></li>
                        </ul>
                    </nav>
                    <hr />
                    <Switch>
                        <Route path='/solving' component={Solving} />
                        <Route path='/creating' component={Creating} />
                    </Switch>
                </div>
            </Router>
        );
    }
}