import React, { Component } from 'react';
import { Text, View, Alert,ImageBackground, ActivityIndicator,Image, AsyncStorage,SafeAreaView,NetInfo } from 'react-native';
import CustomFooter from './CustomFooter';
import TopMenu from './TopMenu';
import CustomHeader from './CustomHeader';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import OfflineNotice from './OfflineNotice';

import NotificationSubData from './NotificationSubData';

class Dependents extends Component {

  constructor(props) {
      super(props);
        this.state = {
          isNotification: true,
            isProfile: false,
            isDependents: true,
            dataArray:[],
            isPolicies: false,
            loaded: false,
            arrayValue: [],
          };
    }

componentWillMount() {
  AsyncStorage.getItem('profileArray')
  .then((contacts) => {
  const value = contacts ? JSON.parse(contacts) : [];

  console.log(value);
  this.setState({ arrayValue: value })
});

}

   componentDidMount() {   
       NetInfo.isConnected.fetch().done((isConnected) => {
               if ( isConnected )
               {                        UserData.retriveData('token').then((resToken) => {
                         UserData.retriveData('memberId').then((res) => {
                             this.getNotifictions(resToken, res);
                             });
                       })                }
               else
               {                }
           });  }

 getNotifictions = (token, memberID) => {

            console.log(token);
              this.setState({ loaded: true });
                ServiceClass.appDetails(token, `notifications/${ memberID}`).then((reData) => {
                    console.log(reData);
                  if (reData.data.status === '1') {
                    console.log(reData.data.data);
                    this.setState({ dataArray: reData.data.data });
                    this.setState({ loaded: false });
                  }
                  else {
                      this.setState({ loaded: false });
                    Alert.alert(reData.data.message);
                  }

                }).catch((error) => {
                    //console.log(error);
                    Alert.alert(error);
                });
      }

    render() {
      const {
        dataArray,
        arrayValue,
        loaded
      } = this.state;

      console.log(dataArray);

      return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.MainContainer}>
        <View style={{ width: '100%', }}>
              <CustomHeader
              headerText={'Notification'}

              />
        </View>

           <ImageBackground
            style={styles.imgBackground}
            resizeMode='cover'
            source={require('../../assets/backgroundBlue.png')} >
            <View style={{ height: '88%', width: '95%',margin:10 }}>
            {<NotificationSubData arrayDescription={dataArray} />}
           </View>

              {
                (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100, height:100, backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
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
        </SafeAreaView>

      );
    }

}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  },
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
      height: 50,
      position: 'absolute',
      bottom: 0

   },
   imgBackground: {
      height: '100%',
      width: '100%',
     },
textrow: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
 borderBottomWidth: 1,
borderColor: '#dedede',

},

textrowGray: {
color: 'black',
fontSize: 16,
flexDirection: 'row',
borderBottomWidth: 1,
backgroundColor:'#dedede',
borderColor: '#dedede',

},

textSub: {
  color: 'black',
  fontSize: 16,
  lineHeight:20,
  textAlign: 'justify',
  padding:10
},
textSubRightImage: {
 justifyContent: 'center',
  alignItems: 'center',
  height:60,
  paddingTop:10
},
};

export default Dependents;