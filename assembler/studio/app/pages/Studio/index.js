import React from 'react';

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';

import FragmentTemplateList from '../../components/FragmentTemplateList';
import NewSelector from '../../components/NewSelector';

import EditFragment from '../../components/EditFragment';
import EditTemplate from '../../components/EditTemplate';
import NewFragment from '../../components/NewFragment';
import NewTemplate from '../../components/NewTemplate';

const ContainerAll = styled.div`
  width: 100%;
`;
const ContainerLeft = styled.div`
  width: 250px;
`;
const ContainerRight = styled.div`
  width: 100% - 300px;
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


const Studio = () => {

  return (

    <ContainerAll>

      <ContainerLeft>
        <FragmentTemplateList />
      </ContainerLeft>

      <ContainerRight>
        <Router>

          <h1>Studio</h1>

          <Link to="/edit-fragment"><Button>Edit Fragment</Button></Link>
          <Link to="/edit-template"><Button>Edit Template</Button></Link>
          <Link to="/new-fragment"><Button>New Fragment</Button></Link>
          <Link to="/new-template"><Button>Edit Fragment</Button></Link>

          <Switch>
            <Route exact path="/edit-fragment" component={EditFragment} />
            <Route exact path="/edit-template" component={EditTemplate} />
            <Route exact path="/new-fragment" component={NewFragment} />
            <Route exact path="/new-template" component={NewTemplate} />
          </Switch>

        </Router>
      </ContainerRight>

    </ContainerAll>
  );
};

export default Studio;
