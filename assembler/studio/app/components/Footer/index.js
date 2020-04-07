var React = require('react');
var ReactDOM = require('react-dom');

import styled from 'styled-components';

const Title = styled.p`
  font-size: 1em;
`;

const Bar = styled.div`
  background-color: #7e7580;
  width: 100%;
  float:left;
  margin-left: 0;
  display: block;

  padding: 1.5em;
  height: 2em;
`;

// padding: 1.5em;
// position: fixed;
// bottom: 0;
// height: 2em;

const Footer = () => {
  return (
    <Bar>
      <Title>Website Creation Studio</Title>
    </Bar>
  );
};

export default Footer;
