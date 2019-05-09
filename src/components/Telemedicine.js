import React, { Component } from 'react';
import { View,Alert ,ScrollView,Text, Image , AsyncStorage, TouchableOpacity,NetInfo, ImageBackground,ActivityIndicator,TouchableHighlight,SafeAreaView } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
import NewCustomHeader from './NewCustomHeader';
import call from 'react-native-phone-call';
import UserData from './UserData';
import ServiceClass from './ServiceClass';
import OfflineNotice from './OfflineNotice';
import ResponsiveImage from 'react-native-responsive-image';
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions, Scene, Router} from 'react-native-router-flux';


class Telemedicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayValue: [],
            telemedicine:[],
            phoneText: '',
            details: '',
            loaded: false,
            isTelemedicineEnable:false,
            test:this.props.test,
        };
    }

    componentWillReceiveProps(nextProps) {
      //alert("Telemedicine call");
      NetInfo.isConnected.fetch().done((isConnected) => {
          if (isConnected)
          {
              UserData.retriveData('token').then((resToken) => {

                  //console.log(resToken);
                  UserData.retriveData('memberId').then((res) => {
                      this.getPolocies(resToken, res);
                  });


              })
          } else
          {

          }
      })

    }

    componentWillMount() {

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected)
            {
                UserData.retriveData('token').then((resToken) => {

                    //console.log(resToken);
                    UserData.retriveData('memberId').then((res) => {
                        this.getPolocies(resToken, res);
                    });


                })
            } else
            {

            }
        });




    }

    getPolocies = (token, memberID) => {

        //console.log(token);
        this.setState({loaded: true});
        ServiceClass.appDetails(token, `appdetails/${ memberID}/telemedicine`).then((reData) => {

            if (reData.data.status === '1') {
              // debugger;
                //console.log(reData.data.data.telemedicine);
                //console.log(reData.data.data.telemedicine[0].details);

                try {
                    AsyncStorage.setItem('isTelemedicineEnable', reData.data.data.isTelemedicineEnable);
                } catch (error) {

                }



                if (reData.data.data.isTelemedicineEnable === "0"){
                    this.setState({loaded: false});
                    this.setState({isTelemedicineEnable: false});
                  alert("Telemedicine not available.")

                }else{

                  this.setState({telemedicine: reData.data.data.telemedicine});
                    this.setState({isTelemedicineEnable: true});
                  this.setState({loaded: false});

                }




            } else {

                Alert.alert(reData.data.message);
                  this.setState({loaded: false});
            }

        }).catch((error) => {
            ////console.log(error);
            Alert.alert(error);
            this.setState({loaded: false});
        });
    }



    async clickToIDCall(number) {
        const args = {
            number: number,

            prompt: true
        }
      await  call(args).catch(console.error)
        //Actions.Telemedicine();

        //alert(args)
    }

     ReplaceAll(Source, stringToFind, stringToReplace) {
        var temp = Source;
        var index = temp.indexOf(stringToFind);

        while (index != -1) {
            temp = temp.replace(stringToFind, stringToReplace);
            index = temp.indexOf(stringToFind);
        }

        return temp;
    }



    renderView() {


    return this.state.telemedicine.map(arrayObj =>
      <View style={{backgroundColor:'#fff',marginBottom:10}}>
      <View style={{ backgroundColor: '#fff', flexDirection: 'row',margin: 10, marginBottom:0,width: '95%' }}>
      <View style={styles.ImageView} >
      <ResponsiveImage
             source={require('../../assets/call_icon.png')} initWidth="40" initHeight="40"
      />
      </View>
      <TouchableOpacity
      activeOpacity={0.5}

      onPress={() => {
                       this.clickToIDCall(arrayObj.phone);
                     }} >
   <View style={{marginTop: 10,marginLeft:10, padding: 15 ,backgroundColor:'#00dcc3',width:'100%'
 }}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',width:'100%'}}>{arrayObj.policyType}</Text>
     </View>
         </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', paddingTop: 5, paddingRight: 20 }}>
          <View style={{padding: 10,marginBottom:5}}>

            <HTML html={this.changeValuetext(arrayObj.details)}  />
          </View>
        </View>
        </View>
      );
    }

changeValuetext = (strDetails) => {

let  details = this.ReplaceAll(strDetails,'&lt;','<');
 details = this.ReplaceAll(details,'&gt;','>');
  return details
}


    render() {
        const{
            arrayValue,
            phoneText,
            loaded,
            details
        } = this.state

        const SampleNameArray = [];
        SampleNameArray.push(details);

        return (
                <SafeAreaView style={styles.safeArea}>
                <View style={styles.MainContainer}>

                <View style={{width: '100%' }}>
                      <NewCustomHeader
                      headerText={'Telemedicine'}
                      />
                </View>
                <View style={{width: '100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#33333350' }}>
                     <Text style ={{  fontSize: 18,  color: '#002e3c', alignItems: 'flex-start',  justifyContent: 'flex-start' }}>Telemedicine</Text>
                </View>

                    <ImageBackground
                   style={styles.imgBackground}
                   resizeMode='cover'
                   source={require('../../assets/backgroundBlue.png')} >



                 {
                    (this.state.isTelemedicineEnable ===false)?null:

                    <View style={{margin: 10,width: '95%' }}>
                       <ScrollView >
                      {this.renderView()}
                       </ScrollView >
                     </View>
                 }

                 <Spinner
                    visible={this.state.loaded}
                    color={'#00dcc3'}
                    />
                  </ImageBackground>

                  <View style={styles.footerView}>
                  <CustomFooter
                      isAccount={false}
                      isAppointment={false}
                      isIDCard={false}
                      isTelemedicine={true}
                      isCustomerService={false}
                      />
                    </View>
                </View>
                 <OfflineNotice />
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
  footerView: {
    width: '100%',
     height: 50,
     position: 'absolute',
     bottom: 0
  },
 containerView: {
   flex: 0,
     justifyContent: 'space-around',
     backgroundColor: '#00dcc3',
     flexDirection: 'row',
     paddingTop: 20,
     height: 60,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
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
   fontSize: 28,
   fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',


 },
      imgBackground: {
            width: '100%',
            height: '100%',


    },  containerActivety: {

       backgroundColor: 'transparent',
       height: '100%',
       width: '100%',
       zIndex: 10000000,
       position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
    },
};
export default Telemedicine;
