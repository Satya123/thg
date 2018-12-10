import React, { Component } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, AsyncStorage,ScrollView,NetInfo } from 'react-native';
import CustomFooter from './CustomFooter';
import PoliciesCard from './PoliciesCard';
import UserData from './UserData';
import ServiceClass from './ServiceClass';

class Policies extends Component {
 constructor(props) {
      super(props);
        this.state = {
            isProfile: false,
            isDependents: false,
            loaded: false,
            isPolicies: true,
            dataArray: [],
            arrayValue:[],
          };
    }
     componentWillMount() {
   
   AsyncStorage.getItem('profileArray')
   .then((contacts) => {
   const value = contacts ? JSON.parse(contacts) : [];
   this.setState({ arrayValue: value })
 });
   }
  
   componentDidMount() {
    NetInfo.isConnected.fetch().done((isConnected) => {
         if ( isConnected )
         {                UserData.retriveData('token').then((resToken) => {
                 UserData.retriveData('memberId').then((res) => {
                   
                        this.getPolocies(resToken, res);
                     });                })          }
         else
         {          }
     });
  }
  
  
   getPolocies = (token, memberID) => {
          
            //console.log(token);
              this.setState({ loaded: true });
                ServiceClass.appDetails(token, `policies/${ memberID}`).then((reData) => {
                  
                  if (reData.data.status === '1') {
                     this.setState({ dataArray: reData.data.data });
                    this.setState({ loaded: false });
                      UserData.saveData('phoneNumber', reData.data.data[0].telemedicine.phone);
                     UserData.saveData('details', reData.data.data[0].telemedicine.details);
                  }
                  else {
                      this.setState({ loaded: false });
                    }

                }).catch((error) => {
                });
      }
    render() {
    
      const {
       dataArray,
        arrayValue,
        loaded
      } = this.state;
   
      //console.log(dataArray);
  return (

        <View style={styles.MainContainer}>


        <ImageBackground
          style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../assets/backgroundBlue.png')} >
          <ScrollView>
          <View style={{  width: '100%' }}>
          <View style={{ margin: 10, width: '95%' }}>
          <PoliciesCard arrayDescription={dataArray} />
          </View>
          </View>
         </ScrollView>
            {
                (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
              }
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
);
}
}

const styles = {

   MainContainer:
    {
        flex: 1,

    },
     containerActivety: {

       backgroundColor: 'transparent',
       height: '100%',
       width: '100%',
       zIndex: 10000000,
       position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerView: {

      width: '100%',
       height: 45,


       position: 'absolute',
       bottom: 0
    },
    imgBackground: {
            width: '100%',
            height: '100%',


    },
};


    export default Policies;
