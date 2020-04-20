import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';

import EditFragment from '../../components/EditFragment';
import EditTemplate from '../../components/EditTemplate';

import styled from 'styled-components';

const Sidebar = styled.div`
  width: 250px;
  top: 0;
  left: 0;
  background-color: #f1ebf2;
  float: left;
  margin-right: 1em;
  padding-left: 1em;
  bottom: 0;
  margin-bottom: 1em;
`;


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
      <Sidebar>

        <Router>
          <p>Fragments</p>
          <ul>
              {this.state.fragments.map(frag =>
                <li key={frag.id}>

                  <Link to={{
                    pathname: "/edit-fragment",
                    state: {dataID: frag.id}
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
                    pathname: "/edit-template",
                    state: {dataID: temp.id}
                  }}>
                    <p>{temp.id}: {temp.class_attr}</p>
                  </Link>

                </li>
              )}
          </ul>
        </Router>

        <Switch>
          <Route exact path="/edit-fragment" component={EditFragment} />
          <Route exact path="/edit-template" component={EditTemplate} />
        </Switch>

      </Sidebar>
    );
  }
};

//
// <Route
//   state={this.state}
//   path='/edit-fragment'
//   render={(props) => <EditFragment {...props} state={this.state} />}
// />
// <Route
//   state={this.state}
//   path='/edit-template'
//   render={(props) => <EditTemplate {...props}  />}
// />
  // <Route exact path="/edit-fragment" component={EditFragment} />
  // <Route exact path="/edit-template" component={EditTemplate} />






export default FragmentTemplateList;
