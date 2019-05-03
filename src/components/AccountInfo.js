/* AccountInfo.js
  THG App
  This file is used for User Account Information like profile etc.
  @Created by Pulkit Arora
*/


import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, Platform,SafeAreaView } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions, Scene, Router} from 'react-native-router-flux';
import Profile from './Profile';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import Dependents from './Dependents';
import Telemedicine from './Telemedicine';
import  Policies  from './Policies';
import CustomHeader from './CustomHeader';
import NewCustomHeader from './NewCustomHeader';
import OfflineNotice from './OfflineNotice';

var isProfile = true;
var isDependents = false;
var isPolicies = false;

class AccountInfo extends Component {

    static callByChild = (profile, dependents, policie) => {
        isProfile = profile;
        isDependents = dependents;
        isPolicies = policie;
    }

    /*
        @isProfile: boolean value are being set in footer component
        @isDependents: boolean value for set  item in footer component
        @isPolicies: boolean value for set  item in footer component
    */


    componentWillReceiveProps(customProps){

            // isProfile = true;

    }


    constructor(props) {
        super(props);
        this.state = {
            isProfile: this.props.isProfile,
            isDependents: this.props.isDependents,
            isPolicies: this.props.isPolicies,
            isAccountInfo: true,
            isFromVendor:this.props.isFromVendor,
       };
    }
      /*
        @this.props.userData: fetching parent class data
        @isProfile: set by default profile selected in footer component
    */
    componentWillMount() {
    //  alert(this.props.telemedicine);
      //  isProfile = true;
        ////console.log(this.props.userData);
        this.setState({isProfile: true});
    }
    /*
      @clickToProfile: this function is used for activing Profile component on Accountinfo class
  */
 clickToProfile = () => {
        this.setState({isProfile: true});
        this.setState({isDependents: false});
        this.setState({isPolicies: false});
        this.setState({isFromVendor: true});
        isProfile = true;
        isDependents = false;
        isPolicies = false;
    }
    /*
      @clickToDependents: this function use for activing Dependents component on Accountinfo class
  */
    clickToDependents = () => {
        this.setState({isProfile: false});
        this.setState({isDependents: true});
        this.setState({isPolicies: false});
        this.setState({isFromVendor: false});
        isProfile = false;
        isDependents = true;
        isPolicies = false;

    }
    /*
      @clickToDependents: this function use for activing Policies component on Accountinfo class
  */
    clickToPolicies = () => {
      this.setState({isFromVendor: false});
        this.setState({isProfile: false});
        this.setState({isDependents: false});
        this.setState({isPolicies: true});
        isProfile = false;
        isDependents = false;
        isPolicies = true;
    }
    /*
      @render: this function is used to present the UI of the components .
  */
    render() {
      const {
          userData
      } = this.props;

      return (
                <SafeAreaView style={styles.safeArea}>
               <View style={styles.MainContainer}>
               <View style={{width: '100%' }}>
                     <NewCustomHeader
                     headerText={'Account Information'}

                     />
               </View>

               <View style={{width: '100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#33333350' }}>
                    <Text style ={{  fontSize: 18,  color: '#002e3c', alignItems: 'flex-start',  justifyContent: 'flex-start' }}>Account Information</Text>
               </View>

               <View style={styles.topView}>

               <TouchableOpacity
               style={(isProfile === true || this.state.isFromVendor === true) ? styles.firstViewActive : styles.firstView}
               activeOpacity={0.5}
               onPress={() => this.clickToProfile()}
               >
               <Text style={(isProfile === true || this.state.isFromVendor === true) ? styles.textActive : styles.textInActive}>PROFILE</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={(isDependents === true && this.state.isFromVendor === false) ? styles.secondViewActive : styles.secondView}
               activeOpacity={0.5}
               onPress={() => this.clickToDependents()}
               >
               <Text style={(isDependents === true && this.state.isFromVendor === false) ? styles.textActive : styles.textInActive}>DEPENDENTS</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 style={(isPolicies === true && this.state.isFromVendor === false) ? styles.thirdViewActive : styles.thirdView}
               activeOpacity={0.5}
               onPress={() => {
                                    this.clickToPolicies();
        }}
               >
                   <Text style={(isPolicies === true && this.state.isFromVendor === false) ? styles.textActive : styles.textInActive}>POLICIES & BENEFITS</Text>
               </TouchableOpacity>

               </View>


               {
                                    (isProfile === true ||  this.state.isFromVendor === true) ? <Profile dataArray={userData}  isFromVendor={this.state.isFromVendor}/> : null
               }
               {
                                    (isDependents === true && this.state.isFromVendor === false) ? <Dependents  /> : null
               }
               {
                                    (isPolicies === true && this.state.isFromVendor === false) ? <Policies  /> : null
               }

               </View>
                 <OfflineNotice />
                 </SafeAreaView>

      );
    }


}

/*
  @styles:  these style constant are used to create a presentable ui .
*/
    const styles = {
        safeArea: {
            flex: 1,

        },
        MainContainer:
                {
                    flex: 1,

                },

        textActive: {
            color: '#00dcc3'
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
            borderColor: '#00dcc3',
            width: '25%',
            alignItems: 'center',
            color: '#00dcc3',
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
            borderColor: '#00dcc3',
            width: '30%',
            alignItems: 'center',
            color: '#00dcc3',
            paddingTop: 18

        },
        thirdViewActive: {
            borderBottomWidth: 2,
            borderColor: '#00dcc3',
            width: '45%',
            alignItems: 'center',
            color: '#00dcc3',
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
