/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var Main = require('./paile_views/Main');
var Router = require('react-native-router');
var {
  AppRegistry
} = React;

var firstRoute = {
  name: "景点",
  component: Main
};

var paile = React.createClass({
  render() {
    return (
      <Router firstRoute={firstRoute} />
     )
  }
});

AppRegistry.registerComponent('paile_1', () => paile);
