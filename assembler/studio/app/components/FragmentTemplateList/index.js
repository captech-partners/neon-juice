import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import axios from 'axios';

import styled from 'styled-components';


const Sidebar = styled.div`
  width: 250px;
  top: 0;
  left: 0;
  background-color: #f1ebf2;
  float: left;
  margin-right: 1em;
  padding-left: 1em;
`;

// const FragmentTemplateList = () => {
//   return (
//     <Sidebar>
//       <p>Fragments</p>
//       <div id="sidebar-fragments"></div>
//
//       <p>Templates</p>
//       <div id="sidebar-templates"></div>
//     </Sidebar>
//   );
// };

//export default FragmentTemplateList;


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
        <p>Fragments</p>
        <ul>
            {this.state.fragments.map(frag =>
              <li key={frag.id}>
                <p>{frag.id}: {frag.class_attr}</p>
              </li>
            )}
        </ul>

        <p>Templates</p>
        <ul>
            {this.state.templates.map(temp =>
              <li key={temp.id}>
                <p>{temp.id}: {temp.class_attr}</p>
              </li>
            )}
        </ul>
      </Sidebar>
    );
  }
};



export default FragmentTemplateList;
