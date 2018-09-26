import React, { Component } from 'react';
import { View, Text, Image , AsyncStorage, TouchableOpacity } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import call from 'react-native-phone-call';
import UserData from './UserData';

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
     };
}
componentDidMount(){
  UserData.retriveData('phoneNumber').then((resPhone) => {
          this.setState({ phoneText: resPhone });
        
         
      })
}  

   componentWillMount() {
     
     
     console.log('componentWillMount call Telemedicine');
   AsyncStorage.getItem('profileArray')
   .then((contacts) => {
   const value = contacts ? JSON.parse(contacts) : [];
   console.log(value);
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
       phoneText
     } = this.state
     const SampleNameArray = ['Lorem Ipsum is simply dummy the printing and typesetting industry.',
     'When an unknown printer took a galley make.',
      'Leap electronic typesetting, remaining essentially unchanged.',
       'It was popularised in the of Letraset sheets.',
       'Containing Lorem Ipsum passages recently with desktop.'];
     return (
       <View style={styles.MainContainer}>
       <View style={{ width: '100%', height: 60 }}>
             <CustomHeader
             headerText={'Telemedicine'}
             />
       </View>
         <View style={{ height: 60, backgroundColor: '#f3f3f3', flexDirection: 'row' }}>
           <View style={styles.ImageView} >
           <Image
                  source={require('../../assets/phone35x35.png')}
           />
           </View>
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => { this.clickToIDCall(phoneText); }} >
           <View style={{ marginTop: 10 }}>
               <Text style={styles.textStyle}>{phoneText}</Text>
             </View>
                 </TouchableOpacity>
         </View>
         <TelemedicineCard arrayDescription={SampleNameArray} />
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
 },
 textStyle: {
   fontSize: 30,
   fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
 }
};
export default Telemedicine;

