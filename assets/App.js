import React, { Component } from 'react';
import { Platform,StyleSheet, TextInput, View, Alert, Button, Text} from 'react-native';

import {  createStackNavigator, } from 'react-navigation';
import  Login  from './src/Login';
import  ProfileActivity  from './src/ProfileActivity';
export default MainProject = createStackNavigator(
{
  First: { screen: Login },
  Second: { screen: ProfileActivity }

});
const styles = StyleSheet.create(
{

    SplashScreen_RootView:
    {
        justifyContent: 'center',
        flex:1,
        margin: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',

    },

    SplashScreen_ChildView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00BCD4',
        flex:1,
        margin: 20,
    },

    TouchableOpacity_Style:{

        width:25,
        height: 25,
        top:9,
        right:9,
        position: 'absolute'

    }
});
