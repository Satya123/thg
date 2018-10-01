/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */






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
import CustomServiecs from './CustomServiecs';
import Appointments from './Appointments';


import IDCard from './IDCard';





import FCM, { NotificationActionType } from "react-native-fcm";
import { Actions } from 'react-native-router-flux';
import { registerKilledListener, registerAppListener } from "./Listeners";
import firebaseClient from "./FirebaseClient";

registerKilledListener();

class NotificationPermission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
       isLogin: false,
      tokenCopyFeedback: ""
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
        }, 500);
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
      console.log("TOKEN (getFCMToken)", token);
      this.setState({ token: token || "" });
    });

    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN (getFCMToken)", token);
      });
    }

    // topic example
    // FCM.subscribeToTopic('sometopic')
    // FCM.unsubscribeFromTopic('sometopic')

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




  sendRemoteNotification(token) {
    debugger;
    console.log(token);
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
    console.log(token);
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



  render() {
    let { token, tokenCopyFeedback,   isLogin } = this.state;

    return (

      <Router>

      <Scene key='root' >
      <Scene hideNavBar>
        <Scene key='Login' component={Login} title='' />
        <Scene key='VendorSplash' component={VendorSplash} title='' />
        <Scene key='HomeScreen' component={HomeScreen} title='' path={'/HomeScreen/:profileData/'} />
        {
          (isLogin === true) ? <Scene key='VendorSplash' component={VendorSplash} title='' initial /> : <Scene key='Login' component={Login} title='' initial />
        }
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
      </Scene>
      </Scene>
      </Router>

    );
  }

  setClipboardContent(text) {

    this.sendRemoteData(text);
    this.sendRemoteNotification(text);
    Clipboard.setString(text);
    this.setState({ tokenCopyFeedback: "Token copied to clipboard." });
    setTimeout(() => {
      this.clearTokenCopyFeedback();
    }, 2000);
  }

  clearTokenCopyFeedback() {
    this.setState({ tokenCopyFeedback: "" });
  }
}

export default NotificationPermission;
