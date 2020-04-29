import React from 'react';
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

const StartPage = (props) => {

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

export default StartPage;
