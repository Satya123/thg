/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import React, {Component} from 'react';
 import { View, StatusBar } from 'react-native';
 import { StackNavigator } from 'react-navigation';
 import Login from './src/components/Login';
 import HomeScreen from './src/components/HomeScreen';
 import Telemedicine from './src/components/Telemedicine';
  import CustomHeader from './src/components/CustomHeader';
  import Profile from './src/components/Profile';
  import Menu from './src/components/Menu';
  import Router from './src/components/Router';
  import OfflineNotice from './src/components/OfflineNotice'
  import AppNew from './app/App';


 const navigationOptions = { title: 'Welcome', header: null, navigationBarHidden: true };
 const AppNavigator = StackNavigator({
   Login: { screen: Login },
   HomeScreen: { screen: HomeScreen,
     navigationOptions: {
       title: 'Home', header: null
     }
},
Telemedicine: { screen: Telemedicine,
    navigationOptions: ({ navigation }) => ({

                header: (

                  <CustomHeader
                  headerText={'Telemedicine'}
                  nav={navigation}
                  />
                ),
                headerLeft: null,
                headerRight: null,
            })
 },
 Profile: { screen: Profile }


});







 export default class App extends Component {
   render() {
     return (

       <AppNew />

     );
   }
 }
