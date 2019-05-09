import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {Container, StyleProvider,  Header, Left, Right, Icon, Button, Body} from 'native-base';
import {Text} from 'react-native';
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
import ChatVC from './ChatVC';
import VendorSplash from './VendorSplash';
import CustomerServices from './CustomerServices';
import Appointments from './Appointments';
import NotificationPermission from './NotificationPermission';
import { Alert, StatusBar } from 'react-native';
import IDCard from './IDCard';
import ViewAppointment from './ViewAppointment';
import RequestAppointmentEdit from './RequestAppointmentEdit';

import LiveChat from '../../LiveChat/LiveChat';

class RouterComponent extends Component {
  constructor() {
    super();

      this.state = {

         isLogin: false,


      };
  }
  componentDidMount() {
    UserData.retriveData('token').then((res) => {
        ////console.log(res);
        if (res === '') {
            this.setState({ isLogin: false });
        } else {

            ////console.log(res);
            this.setState({ isLogin: true });


        }
    }, (err) => {
        ////console.log(err);
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
     {
         (isLogin === true) ? <Scene key='VendorSplash' component={VendorSplash}  initial /> : <Scene key='Login' component={Login}  initial />
       }
       <Scene key='Login' component={Login}  />
       <Scene key='VendorSplash' component={VendorSplash}  />
       <Scene key='HomeScreen' component={HomeScreen}  path={'/HomeScreen/:profileData/'} />
       <Scene key='NotificationPermission' component={NotificationPermission}  />
       <Scene key='Notification' component={Notification}  />
       <Scene key='Appointments' component={Appointments}  />
       <Scene key='Profile' component={Profile}  />
       <Scene key='VendorSplash' component={VendorSplash}  />
       <Scene key='Menu' component={Menu}  />
       <Scene key='Telemedicine' component={Telemedicine}  />
      <Scene key='AccountInfo' component={AccountInfo} title='' path={'/AccountInfo/:userData/'} panHandlers={null}  />
       <Scene key='Dependents' component={Dependents}  />
       <Scene key='Policies' component={Policies}  />
       <Scene key='CustomerServices' component={CustomerServices}  />
       <Scene key='ServiceClass' component={ServiceClass}  />
       <Scene key='IDCard' component={IDCard}  path={'/AccountInfo/:cardData/'} />
       <Scene key='ChatVC' component={ChatVC}   />
       <Scene key='LiveChat' component={LiveChat}   />
       <Scene key='ViewAppointment' component={ViewAppointment}   />
       <Scene key='RouterComponent' component={RouterComponent}   />

       <Scene key='RequestAppointmentEdit' component={RequestAppointmentEdit}   path={'/RequestAppointmentEdit/:appointmentDetailsData/'} />
     </Scene>
     </Scene>
     </Router>
      );


    }


}
const styles = {
  MainContainer:
   {
     flex: 1,
},}

export default RouterComponent;
