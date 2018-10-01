import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import Profile from './Profile';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import Dependents from './Dependents';

import { Policies } from './Policies';
import CustomHeader from './CustomHeader';
var isProfile = true;
var isDependents = false;
var isPolicies = false;

class AccountInfo extends Component {

  static callByChild = (profile, dependents, policie) => {
      isProfile = profile;
      isDependents = dependents;
      isPolicies = policie;
  }


  constructor(props) {
      super(props);
        this.state = {
            isProfile: this.props.isProfile,
            isDependents: this.props.isDependents,
            isPolicies: this.props.isPolicies,
            isAccountInfo: true,
          };
    }

    componentWillMount() {
    RNSecureKeyStore.get('key1')
    .then((res) => {
        //console.log(res);
    }, (err) => {
        //console.log(err);
    });
    }


    showView() {
      if (isProfile === true) {
        //console.log(' call profile view');
          return (<Profile />);
      } else if (isDependents === true) {
        //console.log(' call dependents view');
            return (<Dependents />);
      } else if (isPolicies === true) {
        //console.log(' call Policies view');
          return (<Policies />);
      }
    }

    render() {
      return (

        <View>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'AccountInfo'}

              />
        </View>
          <TopMenu />
          {this.showView()}

        </View>


      );
    }


}

// const styles = {
//         topMenu: {
//           flexDirection: 'row',
//           marginTop: 0,
//           padding: 0,
//           backgroundColor: '#ffffff',
//           height: 60,
//           width: '100%',
//           color: '#ff7417',
//
//         }
// };


export default AccountInfo;
