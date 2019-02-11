import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Alert, Button, Text,Platform,Image, TouchableOpacity,ImageBackground,AsyncStorage,SafeAreaView,Dimensions} from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import CustomFooter from './CustomFooter';
import AccountInfo from './AccountInfo';
import Policies from './Policies';
import CustomHeader from './CustomHeader';
export const AccountInfoProfile = '100';
import { Actions } from 'react-native-router-flux';
import CustomerServices from './CustomerServices';
import SwiperFlatList from 'react-native-swiper-flatlist';
export default class IDCard extends Component {
constructor(props) {
     super(props);


  this.state = {
          isProfile: false,
          isHome: true,
          isMenu: false,
          isNotification: false,
        };
     }

     componentDidMount() {

        setTimeout(() => { this.setState({ loaded: false }); }, 1000);

        AsyncStorage.getItem('profileArray')
        .then((contacts) => {
        const value = contacts ? JSON.parse(contacts) : [];

        //console.log(value);
        this.setState({ arrayValue: value })
      });
        }

render() {

 const {
        arrayValue,
        loaded
      } = this.state;

      console.log("backUrl",this.props.cardData.back);

    return (

<SafeAreaView style={styles.safeArea}>

 <View style={styles.MainContainer}>
  <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../../assets/backgroundBlue.png')}>
       <View style={{ width: '100%', height: 80 }}>
              <CustomHeader
              headerText={'ID Card'}

              />
        </View>
      <View style={styles.container}>
        <SwiperFlatList
        //autoplay
        //  autoplayDelay={2}
          autoplayLoop
          index={0}
          showPagination
        >
          <View style={[styles.child]}>

            <Image  source={{uri:this.props.cardData.front}} borderRadius={10} style={{width:325, height:205,transform: [{ rotate: '90deg'}] }}/>
          </View>
          <View style={[styles.child]}>
            <Image   source={{uri:this.props.cardData.back}} borderRadius={10}  style={{width:325, height:205,transform: [{ rotate: '90deg'}] }}/>
          </View>

        </SwiperFlatList>
      </View>
</ImageBackground>
 <View style={styles.footerView}>
                  <CustomFooter
                  isProfile={this.state.isProfile}
                  isHome={this.state.isHome}
                  isMenu={this.state.isMenu}
                  isNotification={this.state.isNotification}
                  profileData={arrayValue}
                  />
            </View>



          </View>
          </SafeAreaView>
    );
  }
}
export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  },

container: {
          flex:.93,
           padding:0,
          alignItems: 'center',
          height:'50%',
          marginBottom:10
       },
      MainContainer:
       {
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',

       },

      container_logo: {
              //  margin: 0,
                marginBottom:20,
                padding:0,
                alignItems: 'center',
            },

    imgBackground: {
            width: '100%',
            height: '100%',
            //resizeMode: 'cover',
            flex: 1,

    },

  footerView: {
    width: '100%',
     height: 45,

     position: 'absolute',
     bottom: 0

  },

 child: {
    height: '95%',
     width,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding:50,
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },

});