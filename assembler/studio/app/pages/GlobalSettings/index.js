import React from 'react';
import styled from 'styled-components';

import GlobalDetails from '../../components/GlobalDetails';

const Container = styled.div`
  margin: .5em;
  padding-left: .5em;
`
const GlobalSettings = () => {

  return (
    <Container>
      <h1>Global Settings</h1>
      <GlobalDetails />
    </Container>
  );
};

export default GlobalSettings;
