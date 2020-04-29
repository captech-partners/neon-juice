import React from 'react';

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';

import FragmentTemplateList from '../../components/FragmentTemplateList';

import EditFragment from '../../components/EditFragment';
import EditTemplate from '../../components/EditTemplate';
import NewFragment from '../../components/NewFragment';
import NewTemplate from '../../components/NewTemplate';

const Button = styled.button`
  background: #E5C1EE;
  border-radius: 3px;
  border: solid #DBB7E4;
  color: #33153A;
  font-size: .5em;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const Container = styled.div`
  margin: .5em;
  padding-left: .5em;
`

const Studio = () => {

  return (
    <Container>
      <h1>Studio</h1>
      <FragmentTemplateList />
    </Container>
  );
};

export default Studio;
