/* OfflineNotice.js
  THG App
  This file use for Internet Cannectivity.
  @Created by Pulkit Arora
*/


import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, SafeAreaView, Image } from 'react-native';
const {width} = Dimensions.get('window');

function MiniOfflineSign() {
    return (
            <View style={styles.offlineContainer}>

                <Text style={styles.offlineText}>Oops,something went wrong. Please try again.</Text>

               <Text style={styles.offlineTextSub}>The internet connection appears to be offline.</Text>
            </View>
          );
}

class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({isConnected});
        } else {
            this.setState({isConnected});
        }
    }
    ;
            render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}
/*
  @styles:  these style constant are used to create a presentable ui .
*/
const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#00dcc3',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 30
    },

    offlineText: {color: '#fff', fontWeight: 'bold', fontSize: 25,textAlign:'center',marginBottom:10},
    offlineTextSub: {color: '#fff', fontSize: 18,textAlign:'center'}
});

export default OfflineNotice;
