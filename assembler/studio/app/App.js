var React = require('react');
var ReactDOM = require('react-dom');
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';


const Container = styled.div`
  position: relative;
  min-height: 100vh;
`

const Body = styled.div`
  padding-bottom: 5em;
`

const Styles = styled.div`
  .h1 {
    font-weight: 2em;
  }
  .h2 {
    font-weight: 2em;
  }
`;


/**
 * Entry point for all components.
 * react-router enabled.
 */
const App = (props) => {
  return (
    <Styles>
    <Container>
      <Body>
        <NavigationBar />
        {props.children}
      </Body>

      <Footer />
    </Container>
    </Styles>
  );
};

module.exports = App;
