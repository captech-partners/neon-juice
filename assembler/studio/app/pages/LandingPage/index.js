var React = require('react');
var ReactDOM = require('react-dom');
import styled from 'styled-components';

import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';


const Container = styled.div`
  position: relative;
  min-height: 100vh;
`

const Body = styled.div`
  padding-bottom: 5em;
`

/**
 * Entry point for all components.
 * react-router enabled.
 */
const LandingPage = (props) => {
  return (
    <Container>
      <Body>
        <NavigationBar />
        {props.children}
      </Body>
      <Footer />
    </Container>
  );
};

module.exports = LandingPage;