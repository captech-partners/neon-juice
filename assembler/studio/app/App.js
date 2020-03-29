var React = require('react');
var ReactDOM = require('react-dom');

import NavigationBar from './components/NavigationBar';

/**
 * Entry point for all components.
 * react-router enabled.
 */
const App = () => {
  return (
    <NavigationBar />
  );
};

module.exports = App;
