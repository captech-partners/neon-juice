var React = require('react');
var ReactDOM = require('react-dom');

import NavigationBar from './components/NavigationBar';

import Footer from './components/Footer';

/**
 * Entry point for all components.
 * react-router enabled.
 */
const App = (props) => {
  return (
    <div>
      <NavigationBar />
      {props.children}
      <Footer />
    </div>
  );
};

module.exports = App;
