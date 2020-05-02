var React = require('react');
var ReactDOM = require('react-dom');

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import GlobalSettings from '../../pages/GlobalSettings';
import PageView from '../../pages/PageView';
import StartPage from '../../pages/StartPage';
import Studio from '../../pages/Studio';
import Information from '../../pages/Information';

const NavigationBar = () => {
  return (

    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/global-settings">Website Creation Studio</Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/global-settings">Global Settings</Nav.Link>
          <Nav.Link as={Link} to="/studio">Studio</Nav.Link>
          <Nav.Link as={Link} to="/page-view">Page View</Nav.Link>
          <Nav.Link as={Link} to="/information"><i className="far fa-question-circle"></i></Nav.Link>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/global-settings" component={GlobalSettings} />
        <Route exact path="/studio" component={Studio} />
        <Route exact path="/page-view" component={PageView} />
        <Route exact path="/information" component={Information} />
      </Switch>
    </Router>

  );
};

export default NavigationBar;
