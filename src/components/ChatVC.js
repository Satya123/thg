/* Chat.js
  THG App
  This file use for chat with supporte stuff.
  @Created by Pulkit Arora
*/

import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity, ImageBackground, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import call from 'react-native-phone-call';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import LiveChat from '../../LiveChat/LiveChat';


  class ChatVC extends Component {
    constructor(props) {
        super(props);

    }

    /*
      @render: this function use to present the UI of the components .
  */
    render() {

        return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.MainContainer}>

                        <View style={{width: '100%', zIndex: 1000000000000, position: 'absolute' }}>
                            <CustomHeader
                                headerText={'Chat'}
                                />
                        </View>

                        <ImageBackground
                            style={styles.imgBackground}
                            resizeMode='cover'
                            source={require('../../assets/backgroundBlue.png')} >

                            <View>
                                <LiveChat />

                            </View>

                        </ImageBackground>


                    </View>
                </SafeAreaView>
                            );
                }
    }
    /*
      @styles:  constant are use to make a  presentable ui .
    */
    const styles = {
        safeArea: {
            flex: 1,
            backgroundColor: '#ddd'
        },
        MainContainer:
                {
                    flex: 1,
                },
        footerView: {
            width: '100%',
            height: 45,
            position: 'absolute',
            bottom: 0
        },
        containerView: {
            flex: 0,
            justifyContent: 'space-around',
            backgroundColor: '#ff7417',
            flexDirection: 'row',
            paddingTop: 20,
            height: 60,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            elevation: 2,
            position: 'relative'
        },
        ImageView: {
            margin: 5,
            marginTop: 15,
            height: 35,
            width: 35,
            alignItems: 'flex-start',
        },
        textStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        imgBackground: {
            width: '100%',
            height: '100%',

        }, containerActivety: {

            backgroundColor: 'transparent',
            height: '100%',
            width: '100%',
            zIndex: 10000000,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
        },
    };
    export default ChatVC;
