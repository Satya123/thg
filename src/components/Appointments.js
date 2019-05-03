/* Appointment.js
  THG App
  This file use for set your  Appointment with Doctor.
  @Created by Pulkit Arora
  <ResponsiveImage  source={require('../../assets/add.png')}
     initWidth="97" initHeight="50"/>
  >
*/

import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, Platform, AsyncStorage, SafeAreaView, Keyboard } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { Actions } from 'react-native-router-flux';
import RequestAppointment from './RequestAppointment';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import Dependents from './Dependents';
import Telemedicine from './Telemedicine';
import  Policies  from './Policies';
import CustomHeader from './CustomHeader';
import NewCustomHeader from './NewCustomHeader';
import ViewAppointment from './ViewAppointment';
import OfflineNotice from './OfflineNotice';
// var isRequestAppointment = false;
// var isViewAppointments = true;


class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRequestAppointment: this.props.isRequestAppointment,
            isViewAppointments: this.props.isViewAppointments,
            isAccountInfo: true,
             bottomHeight: 0
        };

    }
/*
  @componentWillReceiveProps: this function call after request appontment submitted
  @props: is used to pass value from child(RequestAppointmentSubCard) to  Parent
*/
    componentWillReceiveProps(props) {

    //alert("tset111".this.state.isRequestAppointment)
      if (this.state.isRequestAppointment === true){
        this.setState({isRequestAppointment: false});
        this.setState({isViewAppointments: true});

      }else{

        this.setState({isViewAppointments: true});
      }



    }

    componentWillUnmount() {

    //  alert("tset111".this.state.isRequestAppointment)
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentDidMount(){
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow(e) {
        this.setState({ bottomHeight: e.endCoordinates.height-350})
    }

    _keyboardDidHide() {
        this.setState({ bottomHeight: 0 })
    }

    /*
      Set by default Appoinment list
    */
    componentWillMount() {
      //alert(this.state.isRequestAppointment)
        this.setState({isViewAppointments: this.props.isViewAppointments});

        if (this.state.isRequestAppointment === true){
          this.setState({isRequestAppointment: false});
          this.setState({isViewAppointments: true});

        }else{

          this.setState({isViewAppointments: true});
        }

    }
    /*
      @clickToRequestAppointment: this function use for active RequestAppointment component on Appoinment class
  */
    clickToRequestAppointment = () => {
        this.setState({isRequestAppointment: true});
        this.setState({isViewAppointments: false});
        // isRequestAppointment = true;
        // isViewAppointments = false;
    }
    /*
      @clickToViewAppointments: this function use for active Appoinment list component on Appoinment class
  */
    clickToViewAppointments = () => {


        this.setState({isRequestAppointment: false});
        this.setState({isViewAppointments: true});

        // isRequestAppointment = false;
        // isViewAppointments = true;
    }
    /*
      @render: this function use to present the UI of the components .
  */
    render() {
       // //console.log(this.props.userData);
        return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.MainContainer}>
                    <View style={{width: '100%' }}>
                          <NewCustomHeader
                          headerText={'Appoinment'}

                          />
                    </View>
                    <View style={{width: '100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#33333350' }}>
                         <Text style ={{  fontSize: 18,  color: '#002e3c', alignItems: 'flex-start',  justifyContent: 'flex-start' }}>Appointments</Text>
                    </View>

                        <View style={styles.topView}>

                            <TouchableOpacity
                                style={(this.state.isRequestAppointment === true) ? styles.firstViewActive : styles.firstView}
                                activeOpacity={0.5}
                                onPress={() => this.clickToRequestAppointment()}
                                >
                                <Text style={(this.state.isRequestAppointment === true) ? styles.textActive : styles.textInActive}>REQUEST APPOINTMENT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={(this.state.isViewAppointments === true) ? styles.secondViewActive : styles.secondView}
                                activeOpacity={0.5}
                                onPress={() => this.clickToViewAppointments()}
                                >
                                <Text style={(this.state.isViewAppointments === true) ? styles.textActive : styles.textInActive}>VIEW APPOINTMENTS</Text>
                            </TouchableOpacity>
                        </View>


                        {
                                (this.state.isRequestAppointment === true) ? <RequestAppointment dataArray={this.props.userData} isEnableTele={this.props.isEnableTele} /> : null
                        }
                        {
                                (this.state.isViewAppointments === true) ? <ViewAppointment isEnableTele={this.props.isEnableTele} /> : null
                        }
                        <View style={{ height: 50,  position: 'absolute', left: 0, right: 0, bottom: this.state.bottomHeight }}>
                        <CustomFooter

                            isAccount={false}
                            isAppointment={true}
                            isIDCard={false}
                            isTelemedicine={false}
                            isCustomerService={false}
                            />
                        </View>

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
         footerView: {
                width: '100%',
                height: 50,
                position: 'absolute',
                left: 0, right: 0,
                 bottom: 0

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
            width: '51%',
            alignItems: 'center',
            paddingTop: 18
        },
        firstViewActive: {
            borderBottomWidth: 2,
            borderColor: '#00dcc3',
            width: '51%',
            alignItems: 'center',
            color: '#00dcc3',
            paddingTop: 18

        },
        secondView: {
            borderBottomWidth: 2,
            borderColor: '#ccc',
            width: '49%',
            alignItems: 'center',
            paddingTop: 18
        },
        secondViewActive: {
            borderBottomWidth: 2,
            borderColor: '#00dcc3',
            width: '49%',
            alignItems: 'center',
            color: '#00dcc3',
            paddingTop: 18

        },

        mainContainer: {
            width: '100%',
            height: '100%'

        }

    };

 export default Appointment;