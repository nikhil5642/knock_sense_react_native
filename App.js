/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase'
import React, { Component } from 'react';
import {StyleSheet, AppRegistry, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation'
import login from './components/login'
import home from './components/home'
import add_restaurant from './components/add_restaurant'
import restaurant from './components/restaurant'
var config = {
  apiKey: "AIzaSyDNQSuOrws6PZLTPrIlAemNyInsqMnAoHY",
  authDomain: "knocksense-5319d.firebaseapp.com",
  databaseURL: "https://knocksense-5319d.firebaseio.com",
  projectId: "knocksense-5319d",
  storageBucket: "knocksense-5319d.appspot.com",
  messagingSenderId: "537090303006"
};
firebase.initializeApp(config);

const Navigation =StackNavigator({
   login:
   {
    screen:login 
},
add_restaurant:
   {
    screen:add_restaurant, 
    navigationOptions:  {
      title: 'Add Restaurant',
      headerLeft: null
  }
},
restaurant:
   {
    screen:restaurant, 
    navigationOptions:  {
      title: 'Restaurant',
  }
},
  home:{
      screen:home,
      navigationOptions:  {
        title: 'Home',
        headerLeft: null
    }
  }
})


export default Navigation;
AppRegistry.registerComponent('reactNavigationSample', () => Navigation);