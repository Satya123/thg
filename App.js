/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import React, {Component} from 'react';
 import { View, StatusBar , Text} from 'react-native';
 import { StackNavigator } from 'react-navigation';
 import Login from './src/components/Login';
 import HomeScreen from './src/components/HomeScreen';
 import Telemedicine from './src/components/Telemedicine';
  import CustomHeader from './src/components/CustomHeader';
  import Profile from './src/components/Profile';
  import Menu from './src/components/Menu';
  import Router from './src/components/Router';
  import OfflineNotice from './src/components/OfflineNotice'
  import NotificationPermission from './src/components/NotificationPermission';
  export default class App extends Component {
   render() {
     return (

        <Router />

     );
   }
 }
 
