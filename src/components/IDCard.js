import React, { Component } from 'react'
import { StyleSheet, NetInfo,TextInput, View, Alert, Button, Text,Platform,Image, TouchableOpacity,ImageBackground,AsyncStorage,ActivityIndicator,SafeAreaView,Dimensions} from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import CustomFooter from './CustomFooter';
import AccountInfo from './AccountInfo';
import Policies from './Policies';
import NewCustomHeader from './NewCustomHeader';
export const AccountInfoProfile = '100';
import { Actions } from 'react-native-router-flux';
import ImageZoom from 'react-native-image-pan-zoom';
import SwiperFlatList from 'react-native-swiper-flatlist';
import ServiceClass from './ServiceClass';
import UserData from './UserData';



export default class IDCard extends Component {

  constructor(props) {
     super(props);

      this.state = {

          isProfile: false,
          isHome: true,
          isMenu: false,
          isNotification: false,
          membershipCard:[],
          arrayCardUrl:[],
          back:'',
          front:'',
            loaded: false,
          isData:'0',
        };
     }


     componentWillReceiveProps(nextProps) {
       NetInfo.isConnected.fetch().done((isConnected) => {
           if (isConnected)
           {
               UserData.retriveData('token').then((resToken) => {

                   //console.log(resToken);
                   UserData.retriveData('memberId').then((res) => {
                       this.getCard(resToken, res);
                   });


               })
           } else
           {

           }
       });



     }


componentWillMount(){

  NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected)
      {
          UserData.retriveData('token').then((resToken) => {

              //console.log(resToken);
              UserData.retriveData('memberId').then((res) => {
                  this.getCard(resToken, res);
              });


          })
      } else
      {

      }
  });


}






getCard = (token, memberID) => {

//debugger;
    //console.log(token);
    this.setState({loaded: true});
    ServiceClass.appDetails(token, `appdetails/${ memberID}/idcard`).then((reData) => {

          //console.log(reData.data.data[0]);
//

        if (reData.data.status === '1') {
      //   debugger;
         this.setState({loaded: false});
            if (reData.data.data.membershipCardAvailable == "0"){
              alert("ID card(s) are not available.")

            }else{
              //console.log(reData.data.data)
              //console.log(reData.data.data.membershipCard)
              this.setState({
                front:reData.data.data.membershipCard[0].front,
                back:reData.data.data.membershipCard[0].back

              })

              let  arrAppointment = [];

              this.setState({membershipCard:reData.data.data.membershipCard});
              for (var item in reData.data.data.membershipCard) {
                  //console.log(reData.data.data.membershipCard[item].front);
                  arrAppointment.push({
                      url: reData.data.data.membershipCard[item].front,

                  })
                  arrAppointment.push({
                      url: reData.data.data.membershipCard[item].back,

                  })
              }
              //debugger;
            this.setState({arrayCardUrl:arrAppointment});


            }





            //  this.setState({details: details});
        } else {
            this.setState({loaded: false});
            Alert.alert(reData.data.message);
        }

    }).catch((error) => {
      debugger;
        //console.log(error);
      //  Alert.alert(error);
        this.setState({loaded: false});
    });
}



renderView() {

return this.state.arrayCardUrl.map((array, index) =>


  <View style={[styles.child]}>


    <View style={{alignItems:'center'}}><Image   source={{uri:array.url}} borderRadius={10}  style={{width:325, height:205,transform: [{ rotate: '90deg'}] }}/>
    </View>

       
</View>




  );
}








render() {
    const {
            arrayValue,
            loaded
          } = this.state;

        //  //console.log("backUrl",this.props.cardData.back);

        return (

    <SafeAreaView style={styles.safeArea}>

     <View style={styles.MainContainer}>
      <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../../assets/backgroundBlue.png')}>
           <View style={{ width: '100%' }}>
                  <NewCustomHeader
                  headerText={'ID Card'}

                  />
            </View>
            <View style={{width: '100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#33333350' }}>
                 <Text style ={{  fontSize: 18,  color: '#002e3c', alignItems: 'flex-start',  justifyContent: 'flex-start' }}>ID Card</Text>
            </View>

            {
            (loaded === true) ? <View style={styles.containerActivety}><View style={{width: 100, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><ActivityIndicator size="large" color="#00dcc3" /></View></View> : null
            }

        {
          (this.state.back === '' ) ? null :

          <View style={styles.container}>

            <SwiperFlatList
              autoplayLoop
              index={0}
              showPagination
            >

              {this.renderView()}
              </SwiperFlatList>
          </View>
        }
    </ImageBackground>
     <View style={styles.footerView}>
     <CustomFooter
         isAccount={false}
         isAppointment={false}
         isIDCard={true}
         isTelemedicine={false}
         isCustomerService={false}
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
          marginBottom:20,
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
     height: 50,

     position: 'absolute',
     bottom: 0

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