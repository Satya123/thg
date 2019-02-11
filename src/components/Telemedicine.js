import React, { Component } from 'react';
import { View, Text, Image , AsyncStorage, TouchableOpacity, ImageBackground,ActivityIndicator,ScrollView,Alert,NetInfo} from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import call from 'react-native-phone-call';
import UserData from './UserData';
import OfflineNotice from './OfflineNotice';
import ServiceClass from './ServiceClass';
import ResponsiveImage from 'react-native-responsive-image';
// const args = {
//   number: '9093900003', // String value with the number to call
//   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
// }

class Telemedicine extends Component {
 constructor(props) {
     super(props);
     this.state = {
       arrayValue: [],
       phoneText: '',
       details:'',
       loaded: false,
     };
}
    componentDidMount() {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected)
            {
                UserData.retriveData('token').then((resToken) => {
                    UserData.retriveData('memberId').then((res) => {
                        this.getPolocies(resToken, res);
                    });
                })
            } else
            {
            }
        });
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
  
  
     getPolocies = (token, memberID) => {
      
            //console.log(token);
              this.setState({ loaded: true });
              /***********ServiceClass ***********************************************************************/
                ServiceClass.appDetails(token, `policies/${ memberID}`).then((reData) => {
                
                  if (reData.data.status === '1') {
                    
                    //console.log(reData.data.data[0].telemedicine.details);
                    this.setState({ dataArray: reData.data.data });
                    
//                       UserData.saveData('phoneNumber', reData.data.data[0].telemedicine.phone);
//                      UserData.saveData('details', reData.data.data[0].telemedicine.details);
                    
                    this.setState({ phoneText: reData.data.data[0].telemedicine.phone });
                    
                  let details = reData.data.data[0].telemedicine.details
                  debugger;
                   console.log(details)
                    details = this.ReplaceAll(details,'&lt;','<');
                    details = this.ReplaceAll(details,'&gt;','>');
                    
                    console.log(details)

                 this.setState({details: details});
                    this.setState({ loaded: false });
                  }
                  else {
                      this.setState({ loaded: false });
                   // Alert.alert(reData.data.message);
                  }

                }).catch((error) => {
                    //console.log(error);
                   // Alert.alert(error);
                  this.setState({ loaded: false });
                });
      }
  
   componentWillMount() {
  //   Alert.alert("componentWillMount");
     
  //console.log('componentWillMount call Telemedicine');
   AsyncStorage.getItem('profileArray')
   .then((contacts) => {
   const value = contacts ? JSON.parse(contacts) : [];
   //console.log(value);
   this.setState({ arrayValue: value })
 });
   }
  
  clickToIDCall(number){
    const args = {
      number: number,
      
      prompt: false
    }
    call(args).catch(console.error)
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
       <View style={styles.MainContainer}>
       
       <View style={{ width: '100%', height: 60 }}>
             <CustomHeader
             headerText={'Telemedicine'}
             />
       </View>
           <ImageBackground
          style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../assets/backgroundBlue.png')} >
         <View style={{ height: 80, backgroundColor: '#f3f3f3', flexDirection: 'row' }}>
           <View style={styles.ImageView} >
           <ResponsiveImage
                  source={require('../../assets/call_icon.png')} initWidth="55" initHeight="55"
           />
           </View>
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => { this.clickToIDCall(phoneText); }} >
           <View style={{ marginTop: 5 , padding:10}}>
           <ResponsiveImage
                  source={require('../../assets/Click-to-Call-a-Doctor.png')} initWidth="280" initHeight="50"
           />
             </View>
                 </TouchableOpacity>
                 </View>
   
              <View style={{ margin: 10, width: '95%' }}>
     
           <TelemedicineCard arrayDescription={SampleNameArray} />
           
          </View>
          
           {
                (loaded === true) ? <View style={styles.containerActivety}><View style={{width:100,height:100,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:10}} >< ActivityIndicator size="large" color="#ffa970" /></View></View> : null
              }
          </ImageBackground> 
            
         <View style={styles.footerView}>
                 <CustomFooter
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
 marginRight: 20
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

