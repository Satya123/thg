/* RequestAppointment.js
 THG App
 This file use to Request Appointment .
 @Created by Pulkit Arora
 */
import React, { Component } from 'react';
import { Text, View, ImageBackground, Platform, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import CustomFooter from './CustomFooter';
import UserData from './UserData';
import RequestAppointmentCard from './RequestAppointmentCard';
import CustomHeader from './CustomHeader';
import { Actions } from 'react-native-router-flux';

class RequestAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    /*
     @render: this function use to present the Request Appointment Sub class .
     */
    render() {

        return (
                <View style={styles.MainContainer}>
                    <ImageBackground
                        style={styles.imgBackground}
                        resizeMode='cover'
                        source={require('../../assets/backgroundBlue.png')} >
                        <View style={{height: '95%', width: '100%' }}>
                            <View style={{margin: 10 }}>
                                <RequestAppointmentCard />
                            </View>
                        </View>
                    </ImageBackground>
                
                </View>
                        );
            }

        }
        /*
         @styles:  these style constant are used to create a presentable ui .
         */
        const styles = {
            MainContainer:
                    {
                        flex: 1,
                    },
            imgBackground: {
                width: '100%',
                height: '100%',
            },
            textStyle: {

                color: '#fff',
                fontSize: 22
            }
        };

        export default RequestAppointment;