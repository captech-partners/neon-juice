var React = require('react');
var ReactDOM = require('react-dom');

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';

import GlobalSettings from '../../pages/GlobalSettings';
import PageView from '../../pages/PageView';
import StartPage from '../../pages/StartPage';
import Studio from '../../pages/Studio';
import Information from '../../pages/Information';

const Styling = styled.nav`
  background-color: #FEF5F3;
  font-size: 30px;
  border-radius: 3px;
  border: 2px solid;
`;

const List = styled.ul`
  display: inline;
`;
const ListElem = styled.li`
  display: inline;
`;

const LeftLink = styled(Link)`
    float: left;
    padding: 5px;
`;

const RightLink = styled(Link)`
    float: right;
    color: palevioletred;
    padding: 2px;
`;

const NavigationBar = () => {
  return (
    <Router>
      <div className="home-page">
        <h1>Website Creation Studio</h1>
      </div>

      <div>

        <Styling>
          <List>
            <ListElem>
              <LeftLink to="/global-settings">Global Settings</LeftLink>
            </ListElem>
            <ListElem>
              <LeftLink to="/studio">Studio</LeftLink>
            </ListElem>
            <ListElem>
              <LeftLink to="/page-view">Page View</LeftLink>
            </ListElem>

            <ListElem>
              <RightLink to="/information">Information</RightLink>
            </ListElem>
          </List>

        </Styling>

        <Switch>
          <Route exact path="/global-settings" component={GlobalSettings} />
          <Route exact path="/studio" component={Studio} />
          <Route exact path="/page-view" component={PageView} />
          <Route exact path="/information" component={Information} />
        </Switch>

      </div>

    </Router>
  );
};

export default NavigationBar;
