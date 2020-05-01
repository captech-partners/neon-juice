var React = require('react');
var ReactDOM = require('react-dom');

import styled from 'styled-components';

const Title = styled.p`
  font-size: 1em;
  padding: 1em;
  color: #9a9da0;
`;

const Bar = styled.div`
  background-color: #353a40;
  width: 100%;
  float:left;
  display: block;
  height: 5em;
  class: "d-flex bd-highlight";
`;

const Footer = () => {
  return (
    <Bar>
      <Title>Website Creation Studio</Title>
    </Bar>
  );
};

export default Footer;
