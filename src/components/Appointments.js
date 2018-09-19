import React, { Component } from 'react';
import { View, Text, Image , AsyncStorage } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import TelemedicineCard from './TelemedicineCard';
import CustomFooter from './CustomFooter';
  import CustomHeader from './CustomHeader';

class Appointments extends Component {
  constructor(props) {
      super(props);
      this.state = {

        arrayValue: [],
      };
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

    render() {
      const{
        arrayValue
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
              headerText={'Appointments'}

              />
        </View>



          <View style={{ height: 60, backgroundColor: '#f3f3f3', flexDirection: 'row' }}>
            <View style={styles.ImageView} >
            <Image

                   source={require('../../assets/phone35x35.png')}
            />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.textStyle}>1800 000 0000</Text>
              </View>
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


export default Appointments;
