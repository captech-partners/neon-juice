var React = require('react');
var ReactDOM = require('react-dom');

import styled from 'styled-components';

const Title = styled.p`
  font-size: 1em;
`;

const Bar = styled.div`
  background-color: #7e7580;
  padding: 1.5em;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <Bar>
      <Title>Website Creation Studio</Title>
    </Bar>
  );
};

export default Footer;
