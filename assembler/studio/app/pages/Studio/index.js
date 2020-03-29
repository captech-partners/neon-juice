import React from 'react';

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';


import EditFragment from '../../components/EditFragment';
import EditTemplate from '../../components/EditTemplate';
import NewFragment from '../../components/NewFragment';
import NewTemplate from '../../components/NewTemplate';


const Studio = () => {

  return (

    <Router>

      <div className="studio">
        <h1>Studio</h1>
      </div>

      <Switch>
        <Route exact path="/edit-fragment" component={EditFragment} />
        <Route exact path="/edit-template" component={EditTemplate} />
        <Route exact path="/new-fragment" component={NewFragment} />
        <Route exact path="/new-template" component={NewTemplate} />
      </Switch>

    </Router>
  );
};

export default Studio;
