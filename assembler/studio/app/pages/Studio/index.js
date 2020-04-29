import React from 'react';
import styled from 'styled-components';

import FragmentTemplateList from '../../components/FragmentTemplateList';

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
