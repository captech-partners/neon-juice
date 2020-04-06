var React = require('react');
var ReactDOM = require('react-dom');

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';

import GlobalSettings from '../../pages/GlobalSettings';
import PageView from '../../pages/PageView';
import StartPage from '../../pages/StartPage';
import Studio from '../../pages/Studio';
import Information from '../../pages/Information';

const Nav = styled.nav`
  background-color: #f1ebf2;
  padding-top: 3px;
  font-size: 2em;
  padding-bottom: 10px;
`;

const List = styled.ul`
  display: inline;
`;
const ListElem = styled.li`
  display: inline;
`;

const LeftLink = styled(Link)`
    float: left;
`;

const RightLink = styled(Link)`
    float: right;
    padding: 0.25em;
`;

const Button = styled.button`
  background: #E5C1EE;
  border-radius: 3px;
  border: solid #DBB7E4;
  color: #33153A;
  font-size: .5em;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const NavigationBar = () => {
  return (

    <Router>
      <Nav>
        <List>
          <ListElem>
            <LeftLink to="/global-settings"><Button>Global Settings</Button></LeftLink>
          </ListElem>
          <ListElem>
            <LeftLink to="/studio"><Button>Studio</Button></LeftLink>
          </ListElem>
          <ListElem>
            <LeftLink to="/page-view"><Button>Page View</Button></LeftLink>
          </ListElem>

          <ListElem>
            <RightLink to="/information"><i className="far fa-question-circle"></i></RightLink>
          </ListElem>
        </List>
      </Nav>

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
