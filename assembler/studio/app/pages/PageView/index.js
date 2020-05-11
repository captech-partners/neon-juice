import React from 'react';
import styled from 'styled-components';

import PageGenerator from '../../components/PageGenerator';

const Container = styled.div`
  margin: .5em;
  padding-left: .5em;
`

const PageView = () => {

  return (
    <Container>
      <h1>Page View</h1>
      <PageGenerator/>
    </Container>
  );
};

export default PageView;
