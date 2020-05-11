import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';

import EditFragment from '../../components/EditFragment';
import EditTemplate from '../../components/EditTemplate';

import NewFragment from '../../components/NewFragment';
import NewTemplate from '../../components/NewTemplate';

import styled from 'styled-components';
import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';

const Sidebar = styled.div`
  width: 18%;
  top: 0;
  left: 0;
  bottom: 0;
  float: left;
  padding-left: 1em;
  margin-right: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: #f7f8f9;
`;

const Main = styled.div`
  margin: .5em;
  padding-left: .5em;
`

class FragmentTemplateList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      fragments: [],
      templates: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/fragments`)
      .then(result => {

        result.data.sort(function(a, b) {
  				return a.id - b.id  ||  a.class_attr.localeCompare(b.class_attr);
  			});

        const fragList = result.data.filter(obj => (obj.id >= 0)).map(obj => obj);
        const tempList = result.data.filter(obj => (obj.id < 0)).map(obj => obj);

        this.setState({ fragments: fragList });
        this.setState({ templates: tempList });
      })
  }

  // componentDidUpdate(prevState) {
  //
  //   if((this.state !== prevState)) {
  //     axios.get(`http://localhost:5000/fragments`)
  //       .then(result => {
  //
  //         result.data.sort(function(a, b) {
  //   				return a.id - b.id  ||  a.class_attr.localeCompare(b.class_attr);
  //   			});
  //
  //         const fragList = result.data.filter(obj => (obj.id >= 0)).map(obj => obj);
  //         const tempList = result.data.filter(obj => (obj.id < 0)).map(obj => obj);
  //
  //         this.setState({ fragments: fragList });
  //         this.setState({ templates: tempList });
  //       })
  //   }
  // }

  render() {

    this.state.fragments.forEach(frag => {
      if(frag.class_attr == null){
        frag.class_attr = "null";
      }
    });

    this.state.templates.forEach(temp => {
      if(temp.class_attr == null){
        temp.class_attr = "null";
      }
    });

    return (
      <Router>

        <DropdownButton variant="outline-info" title="Create New">
          <Dropdown.Item as={Link} to="/new-fragment">New Fragment</Dropdown.Item>
          <Dropdown.Item as={Link} to="/new-template">New Template</Dropdown.Item>
        </DropdownButton>

        <Sidebar>
          <p>Fragments</p>
          <ul>
            {this.state.fragments.map(frag =>
              <li key={frag.id}>
                <Link to={{
                  pathname: `/edit-fragment/${frag.id}`,
                  state: {
                    givenDataID: frag.id
                  }
                }}>
                  <p>{frag.id}: {frag.class_attr}</p>
                </Link>
              </li>
            )}
          </ul>

          <p>Templates</p>
          <ul>
            {this.state.templates.map(temp =>
              <li key={temp.id}>
                <Link to={{
                  pathname: `/edit-template/${temp.id}`,
                  state: {
                    givenDataID: temp.id
                  }
                }}>
                  <p>{temp.id}: {temp.class_attr}</p>
                </Link>
              </li>
            )}
          </ul>
        </Sidebar>

        <Main>
          <Switch>
            <Route path="/edit-fragment" component={EditFragment} />
            <Route path="/edit-template" component={EditTemplate} />
            <Route exact path="/new-fragment" component={NewFragment} />
            <Route exact path="/new-template" component={NewTemplate} />
          </Switch>
        </Main>
      </Router>
    );
  }
};

export default FragmentTemplateList;
