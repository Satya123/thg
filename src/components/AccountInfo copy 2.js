import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions } from 'react-native-router-flux';
import Profile from './Profile';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import Dependents from './Dependents';
import Telemedicine from './Telemedicine';
import  Policies  from './Policies';
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
      console.log('AccountInfoDidMountcall');
      console.log(this.props.userData);

    }


    showView() {

    }
    clickToProfile = () => {
      this.setState({ isProfile: true });
      this.setState({ isDependents: false });
      this.setState({ isPolicies: false });
        isProfile = true;
          isDependents = false;
          isPolicies = false;
        }
    clickToDependents = () => {
        this.setState({ isProfile: false });
        this.setState({ isDependents: true });
        this.setState({ isPolicies: false });
        isProfile = false;
          isDependents = true;
          isPolicies = false;

    }
    clickToPolicies = () => {
          this.setState({ isProfile: false });
          this.setState({ isDependents: false });
          this.setState({ isPolicies: true });
          isProfile = false;
            isDependents = false;
            isPolicies = true;

      }




    render() {
      const {
          userData
      } = this.props;

    //  console.log(userData);
      return (

        <View style={styles.MainContainer}>
        <View style={{ width: '100%', height: 60 }}>
              <CustomHeader
              headerText={'AccountInfo'}

              />
        </View>
        <View style={styles.topView}>

        <TouchableOpacity
        style={(isProfile === true) ? styles.firstViewActive : styles.firstView}
        activeOpacity={0.5}
        onPress={() => this.clickToProfile()}
        >
        <Text style={(isProfile === true) ? styles.textActive : styles.textInActive}>PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(isDependents === true) ? styles.secondViewActive : styles.secondView}
        activeOpacity={0.5}
        onPress={() => this.clickToDependents()}
        >
        <Text style={(isDependents === true) ? styles.textActive : styles.textInActive}>DEPENDENTS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={(isPolicies === true) ? styles.thirdViewActive : styles.thirdView}
        activeOpacity={0.5}
        onPress={() => { this.clickToPolicies(); }}
        >
            <Text style={(isPolicies === true) ? styles.textActive : styles.textInActive}>POLICIES & BENIFITS</Text>
        </TouchableOpacity>

        </View>
        <View style={styles.mainContainer}>

          {
            (isProfile === true) ? <Profile dataArray={userData} /> : null
          }
          {
            (isDependents === true) ? <Dependents /> : null
          }
          {
              (isPolicies === true) ? <Policies /> : null
          }
        </View>
        </View>


      );
    }


}

const styles = {
  MainContainer:
   {
     flex: 1,

      backgroundColor: 'red',
      paddingTop: ( Platform.OS === 'ios') ? 20 : 0
   },

  textActive: {
        color: '#ff7417'
  },
  textInActive: {
        color: 'black'
  },


topView: {
  flexDirection: 'row',
  marginTop: 0,
  padding: 0,

  height: 50,
  width: '100%',
  backgroundColor: '#ffffff',

},
firstView: {
  borderBottomWidth: 2,
  borderColor: '#ccc',
  width: '25%',
  alignItems: 'center',
   paddingTop: 18
},
firstViewActive: {
  borderBottomWidth: 2,
  borderColor: '#ff7417',
  width: '25%',
  alignItems: 'center',
  color: '#ff7417',
  paddingTop: 18

},
secondView: {
  borderBottomWidth: 2,
  borderColor: '#ccc',
  width: '30%',
  alignItems: 'center',
   paddingTop: 18
},
secondViewActive: {
  borderBottomWidth: 2,
  borderColor: '#ff7417',
  width: '30%',
  alignItems: 'center',
  color: '#ff7417',
  paddingTop: 18

},
thirdViewActive: {
  borderBottomWidth: 2,
  borderColor: '#ff7417',
  width: '45%',
  alignItems: 'center',
  color: '#ff7417',
  paddingTop: 18

},
thirdView: {
  borderBottomWidth: 2,
  borderColor: '#dedede',
  width: '45%',
  alignItems: 'center',
   paddingTop: 18
},
mainContainer: {
  width: '100%',
  height: '100%'

}

};


export default AccountInfo;
