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

const FragmentTemplateList = () => {
  return (
    <Sidebar>
      <p>Fragments</p>
      <div id="sidebar-fragments"></div>

      <p>Templates</p>
      <div id="sidebar-templates"></div>
    </Sidebar>
  );
};




//
// class FragmentTemplateList extends Component {
//
//   constuctor () {
//     this.state = {
//       fragments: [],
//       templates: []
//     };
//   }
//
//   componentDidMount() {
//     axios.get(`http://localhost:5000/fragments`)
//       .then(result => {
//
//         result.sort(function(a, b) {
//   				return a.id - b.id  ||  a.class_attr.localeCompare(b.class_attr);
//   			});
//
//         const fragList = result.map(obj => obj.data);
//         this.setState({ fragments: fragList });
//       })
//   }
//
//   render() {
//     return (
//       <Sidebar>
//         <p>Fragments</p>
//         <ul>
//             {this.state.fragments.map(frag =>
//               <li><p> { frag.id }: { frag.file_name } </p></li>
//             )}
//         </ul>
//       </Sidebar>
//     );
//   }
// };

// <p>Templates</p>
// <div id="sidelist-templates">
//   <ul>
//     {this.state.posts.map(post =>
//       <li key={post.id}>{post.title}</li>
//     )}
//   </ul>
// </div>


export default FragmentTemplateList;
