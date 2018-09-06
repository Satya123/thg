import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Login from './Login';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Telemedicine from './Telemedicine';
import Menu from './Menu';
import Notification from './Notification';
import CustomHeader from './CustomHeader';
import AccountInfo from './AccountInfo';
import Dependents from './Dependents';
import Policies from './Policies';
import ServiceClass from './ServiceClass';
import UserData from './UserData';
import VendorSplash from './VendorSplash';
import { Alert } from 'react-native';



class RouterComponent extends Component {
  constructor() {
    super();

      this.state = {

         isLogin: false,


      };
  }
  componentDidMount() {
    UserData.retriveData('token').then((res) => {
        console.log(res);
        if (res === '') {
            this.setState({ isLogin: false });

        } else {
            console.log(res);
            this.setState({ isLogin: true });

        }
    }, (err) => {
        console.log(err);
    });
  }


    render() {
      const {
          isLogin
      } = this.state;
      return (
        <Router>
        <Scene key='root' >
        <Scene hideNavBar>
        <Scene key='HomeScreen' component={HomeScreen} title='' />
        {
          (isLogin === true) ? <Scene key='VendorSplash' component={VendorSplash} title='' initial /> : <Scene key='Login' component={Login} title='' initial />
        }
        <Scene key='Profile' component={Profile} title='' />
        <Scene key='VendorSplash' component={VendorSplash} title='' />
        <Scene key='Menu' component={Menu} title='' />
        <Scene key='Notification' component={Notification} title='' />
        <Scene key='Telemedicine' component={Telemedicine} title='' />
        <Scene key='AccountInfo' component={AccountInfo} title='' />
        <Scene key='Dependents' component={Dependents} title='' />
        <Scene key='Policies' component={Policies} title='' />
        <Scene key='ServiceClass' component={ServiceClass} title='' />
        </Scene>

        </Scene>

        </Router>
      );
    }


}


export default RouterComponent;
