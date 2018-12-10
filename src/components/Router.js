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
import Chat from './Chat';
import VendorSplash from './VendorSplash';
import CustomServiecs from './CustomServiecs';
import Appointments from './Appointments';
import NotificationPermission from './NotificationPermission';
import { Alert, StatusBar } from 'react-native';
import IDCard from './IDCard';
import ViewAppointment from './ViewAppointment';
import RequestAppointmentEdit from './RequestAppointmentEdit';


class RouterComponent extends Component {
  constructor() {
    super();

      this.state = {

         isLogin: false,


      };
  }
  componentDidMount() {
    UserData.retriveData('token').then((res) => {
        //console.log(res);
        if (res === '') {
            this.setState({ isLogin: false });
        } else {

            //console.log(res);
            this.setState({ isLogin: true });


        }
    }, (err) => {
        //console.log(err);
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
         (isLogin === true) ? <Scene key='VendorSplash' component={VendorSplash} title='' initial /> : <Scene key='Login' component={Login} title='' initial />
       }
       <Scene key='Login' component={Login} title='' />
       <Scene key='VendorSplash' component={VendorSplash} title='' />
       <Scene key='HomeScreen' component={HomeScreen} title='' path={'/HomeScreen/:profileData/'} />
       <Scene key='NotificationPermission' component={NotificationPermission} title='' />
       <Scene key='Notification' component={Notification} title='' />
       <Scene key='Appointments' component={Appointments} title='' />
       <Scene key='Profile' component={Profile} title='' />
       <Scene key='VendorSplash' component={VendorSplash} title='' />
       <Scene key='Menu' component={Menu} title='' />
       <Scene key='Telemedicine' component={Telemedicine} title='' />
       <Scene key='AccountInfo' component={AccountInfo} title='' path={'/AccountInfo/:userData/'} />
       <Scene key='Dependents' component={Dependents} title='' />
       <Scene key='Policies' component={Policies} title='' />
       <Scene key='CustomServiecs' component={CustomServiecs} title='' />
       <Scene key='ServiceClass' component={ServiceClass} title='' />
       <Scene key='IDCard' component={IDCard} title='' path={'/AccountInfo/:cardData/'} />
       <Scene key='Chat' component={Chat} title=''  />
       <Scene key='ViewAppointment' component={ViewAppointment} title=''  />
       <Scene key='RouterComponent' component={RouterComponent} title=''  />
       <Scene key='RequestAppointmentEdit' component={RequestAppointmentEdit} title=''  path={'/RequestAppointmentEdit/:appointmentDetailsData/'} />
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
