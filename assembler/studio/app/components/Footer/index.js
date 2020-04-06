var React = require('react');
var ReactDOM = require('react-dom');

import styled from 'styled-components';

const Title = styled.p`
  font-size: 1em;
  position: relative;
  bottom: 0;
`;

const Bar = styled.div`
  background-color: #7e7580;
  padding: 1.5em;
`;

const Footer = () => {
  return (
    <Bar>
      <Title>Website Creation Studio</Title>
    </Bar>
  );
};

export default Footer;
