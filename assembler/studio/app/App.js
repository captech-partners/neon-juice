var React = require('react');
var ReactDOM = require('react-dom');

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';

import GlobalSettings from './pages/GlobalSettings';
import PageView from './pages/PageView';
import StartPage from './pages/StartPage';
import Studio from './pages/Studio';

/**
 * Renders a react-router enabled app with a wrapper to facilitate shared styles
 * and markup; add new routes for pages here.
 */

/**
 * Entry point for all components.
 * react-router enabled.
 */
const App = () => {
  return (

    <Router>

      <div className="home-page">
        <h1>Website Creation Studio</h1>
      </div>

      <div>
        <nav>
          <ul>
            <li>
              <Link to="/global-settings">Global Settings</Link>
            </li>
            <li>
              <Link to="/studio">Studio</Link>
            </li>
            <li>
              <Link to="/page-view">Page View</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/global-settings" component={GlobalSettings} />
          <Route exact path="/studio" component={Studio} />
          <Route exact path="/page-view" component={PageView} />
        </Switch>
      </div>

    </Router>
  );
};

module.exports = App;
