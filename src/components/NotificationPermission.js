/**
  NotificationPermission.js
  THG App
  This file use for Notification Permission and set Route of App.
  @Created by Pulkit Arora
**/

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform,
  ScrollView,
  Alert,
  StatusBar

} from "react-native";
import { Scene, Router } from 'react-native-router-flux';
import LiveChat from '../../LiveChat/LiveChat';
import Login from './Login';
import HomeScreen from './HomeScreen';
import RequestAppointmentEdit from './RequestAppointmentEdit';
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
import CustomerServices from './CustomerServices';
import Appointments from './Appointments';
import ChatVC from './ChatVC';
import IDCard from './IDCard';
import FCM, { NotificationActionType } from "react-native-fcm";
import { Actions } from 'react-native-router-flux';
import { registerKilledListener, registerAppListener } from "./Listeners";
import firebaseClient from "./FirebaseClient";
import ViewAppointment from './ViewAppointment';
registerKilledListener();

class NotificationPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
       isLogin: false,
    };
  }



  async componentDidMount() {
    FCM.createNotificationChannel({
      id: 'default',
      name: 'Default',
      description: 'used for example',
      priority: 'high'
    })
    registerAppListener(this.props.navigation);
    FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      });

      if (notif && notif.targetScreen === "Notification") {
        setTimeout(() => {
            Actions.Notification();
        }, 200);
      }
    });

    try {
      let result = await FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true
      });
    } catch (e) {
      console.error(e);
    }

    FCM.getFCMToken().then(token => {
      UserData.saveData('deviceToken', token);
      //console.log("TOKEN (getFCMToken)", token);
      this.setState({ token: token || "" });
    });

    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {

        //console.log("APNS TOKEN (getFCMToken)", token);
      });
    }

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

  sendRemoteNotification(token) {
    let body;
    if (Platform.OS === "android") {
      body = {
        to: token,
        data: {
          custom_notification: {
            title: "Simple FCM Client",
            body: "Click me to go to detail",
            sound: "default",
            priority: "high",
            show_in_foreground: true,
            targetScreen: "detail"
          }
        },
        priority: 10
      };
    } else {
      body = {
        to: token,
        notification: {
          title: "Simple FCM Client",
          body: "Click me to go to detail",
          sound: "default"
        },
        data: {
          targetScreen: "detail"
        },
        priority: 10
      };
    }

    firebaseClient.send(JSON.stringify(body), "notification");
  }

  sendRemoteData(token) {
    //console.log(token);
    let body = {
      to: token,
      data: {
        title: "Simple FCM Client",
        body: "This is a notification with only DATA.",
        sound: "default"
      },
      priority: "normal"
    };
    firebaseClient.send(JSON.stringify(body), "data");
  }
/*
  Set Rouet for app files
*/
render() {
    let { token,   isLogin } = this.state;

    return (
<Router>
    <Scene key='root' >
      <Scene hideNavBar>
      {
          (isLogin === true) ? <Scene key='VendorSplash' component={VendorSplash} initial={true} wrapRouter={true} /> : <Scene key='Login' component={Login} initial={true} wrapRouter={true} />
        }
        <Scene key='Login' component={Login} />
        <Scene key='VendorSplash' component={VendorSplash} />
        <Scene key='HomeScreen' component={HomeScreen}  />
        <Scene key='NotificationPermission' component={NotificationPermission} />
        <Scene key='Notification' component={Notification} />
        <Scene key='Appointments' component={Appointments} />
        <Scene key='Profile' component={Profile} />
        <Scene key='VendorSplash' component={VendorSplash} />
        <Scene key='Menu' component={Menu} />
        <Scene key='Telemedicine' component={Telemedicine} />
        <Scene key='AccountInfo' component={AccountInfo} path={'/AccountInfo/:userData/'} />
        <Scene key='Dependents' component={Dependents} />
        <Scene key='Policies' component={Policies} />
        <Scene key='CustomerServices' component={CustomerServices} />
        <Scene key='ServiceClass' component={ServiceClass} />
        <Scene key='IDCard' component={IDCard}  path={'/AccountInfo/:cardData/'} />
        <Scene key='ChatVC' component={ChatVC}  />
        <Scene key='LiveChat' component={LiveChat}  />
        <Scene key='ViewAppointment' component={ViewAppointment}  />
        <Scene key='RequestAppointmentEdit' component={RequestAppointmentEdit}  path={'/RequestAppointmentEdit/:appointmentDetailsData/'} />
      </Scene>
      </Scene>
      </Router>

    );
  }


}

export default NotificationPermission;
